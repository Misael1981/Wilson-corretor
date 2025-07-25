import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"; // Firestore
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"; // Firebase Storage
import { db, storage } from "@/firebase"; // Importa as instâncias do db e storage

// Importa o componente Button (se você o tiver em outro lugar, ajuste o caminho)
import Button from "@/Components/Button"; // Ajuste o caminho conforme sua estrutura

// Styled Components (reutilizando os do CreateProperties, se possível)
const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: "Inter", sans-serif;
  color: var(--color-blue);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const FormTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-blue);
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-blue);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  color: #333;
  background-color: #f9f9f9;

  &:focus {
    border-color: var(--color-golden);
    outline: none;
    box-shadow: 0 0 0 2px rgba(243, 156, 18, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  color: #333;
  background-color: #f9f9f9;

  &:focus {
    border-color: var(--color-golden);
    outline: none;
    box-shadow: 0 0 0 2px rgba(243, 156, 18, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  color: #333;
  background-color: #f9f9f9;
  appearance: none; /* Remove a seta padrão do select */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23666' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 11.586l-3.586-3.586L5 9.707l4.293 3.243z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 0.8rem;

  &:focus {
    border-color: var(--color-golden);
    outline: none;
    box-shadow: 0 0 0 2px rgba(243, 156, 18, 0.2);
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 10;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  ${Button.styledComponent} {
    /* Aplica estilos ao Button Stylized */
    flex: 1;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
  color: ${(props) => (props.type === "error" ? "red" : "green")};
`;

const EditPropertiesPage = () => {
  const { id } = useParams(); // Obtém o ID do imóvel da URL
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    price: "",
    type: "",
    status: "for_sale",
    bedrooms: "",
    bathrooms: "",
    area: "",
    ownerName: "",
    ownerPhone: "",
    projectCode: "", // NOVO CAMPO: Código do Projeto
    garageSpaces: "", // NOVO CAMPO: Vagas na Garagem
    amenities: [],
  });

  // Estados para imagens
  const [originalImageUrls, setOriginalImageUrls] = useState([]); // URLs das imagens como vieram do Firestore
  const [currentImageUrls, setCurrentImageUrls] = useState([]); // URLs das imagens atualmente exibidas (existentes)
  const [newImageFiles, setNewImageFiles] = useState([]); // Novos arquivos de imagem selecionados
  const [newImagePreviews, setNewImagePreviews] = useState([]); // URLs para pré-visualização de novas imagens

  // Estados para feedback do usuário
  const [loading, setLoading] = useState(false);
  const [isFetchingProperty, setIsFetchingProperty] = useState(true); // Estado para carregar dados do imóvel
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' ou 'error'

  // Efeito para carregar os dados do imóvel quando o componente monta ou o ID muda
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setMessage("ID do imóvel não encontrado na URL.");
        setMessageType("error");
        setIsFetchingProperty(false);
        return;
      }

      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPropertyData({
            title: data.title || "",
            description: data.description || "",
            address: data.address || "",
            neighborhood: data.neighborhood || "",
            city: data.city || "",
            state: data.state || "",
            price: data.price !== undefined ? data.price.toString() : "", // Converte para string para o input
            type: data.type || "",
            status: data.status || "for_sale",
            bedrooms:
              data.bedrooms !== undefined ? data.bedrooms.toString() : "",
            bathrooms:
              data.bathrooms !== undefined ? data.bathrooms.toString() : "",
            area: data.area !== undefined ? data.area.toString() : "",
            ownerName: data.ownerName || "",
            ownerPhone: data.ownerPhone || "",
            projectCode: data.projectCode || "", // NOVO: Popula Código do Projeto
            garageSpaces:
              data.garageSpaces !== undefined
                ? data.garageSpaces.toString()
                : "", // NOVO: Popula Vagas na Garagem
            amenities: data.amenities || [],
          });
          setOriginalImageUrls(data.imageUrls || []);
          setCurrentImageUrls(data.imageUrls || []); // Inicializa com as imagens existentes
        } else {
          setMessage("Imóvel não encontrado.");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        setMessage(`Erro ao carregar imóvel: ${error.message}`);
        setMessageType("error");
      } finally {
        setIsFetchingProperty(false);
      }
    };

    fetchProperty();
  }, [id]); // Dependência do ID para recarregar se o ID da URL mudar

  // Manipulador de mudança para campos de texto e select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manipulador de mudança para o input de arquivo (novas imagens)
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  // Manipulador para remover uma imagem EXISTENTE (do Firestore)
  const handleRemoveExistingImage = (urlToRemove) => {
    setCurrentImageUrls((prevUrls) =>
      prevUrls.filter((url) => url !== urlToRemove)
    );
  };

  // Manipulador para remover uma NOVA imagem (da pré-visualização)
  const handleRemoveNewImage = (indexToRemove) => {
    setNewImageFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setNewImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  // Função para fazer upload das NOVAS imagens para o Firebase Storage
  const uploadNewImages = async (files) => {
    const imageUrls = [];
    for (const file of files) {
      const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload do ${file.name} está ${progress}% feito.`);
          },
          (error) => {
            console.error("Erro no upload da nova imagem:", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }
    return imageUrls;
  };

  // Função para deletar imagens do Firebase Storage
  const deleteOldImages = async (urlsToDelete) => {
    for (const url of urlsToDelete) {
      try {
        // Obter o caminho do arquivo no Storage a partir da URL
        // Ex: https://firebasestorage.googleapis.com/v0/b/project.appspot.com/o/path%2Fto%2Ffile.jpg?...
        // Precisamos de 'path/to/file.jpg'
        const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
        console.log(`Imagem deletada do Storage: ${path}`);
      } catch (error) {
        console.error(`Erro ao deletar imagem ${url} do Storage:`, error);
        // Não lançar erro para não parar o processo de atualização do documento
      }
    }
  };

  // Manipulador de submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // 1. Upload das NOVAS imagens para o Firebase Storage
      const uploadedNewImageUrls = await uploadNewImages(newImageFiles);

      // 2. Determinar quais imagens EXISTENTES foram removidas e deletá-las do Storage
      const urlsToDelete = originalImageUrls.filter(
        (url) => !currentImageUrls.includes(url)
      );
      await deleteOldImages(urlsToDelete);

      // 3. Combinar as URLs das imagens atuais (existentes + novas)
      const finalImageUrls = [...currentImageUrls, ...uploadedNewImageUrls];

      // 4. Atualiza os dados do imóvel no Firestore
      const docRef = doc(db, "properties", id);
      await updateDoc(docRef, {
        ...propertyData,
        price: parseFloat(propertyData.price),
        bedrooms: parseInt(propertyData.bedrooms),
        bathrooms: parseInt(propertyData.bathrooms),
        area: parseFloat(propertyData.area),
        garageSpaces: parseInt(propertyData.garageSpaces), // NOVO: Converte vagas para número inteiro
        imageUrls: finalImageUrls, // Salva as URLs finais das imagens
        updatedAt: Timestamp.now(), // Atualiza o timestamp
      });

      setMessage("Imóvel atualizado com sucesso!");
      setMessageType("success");

      // Opcional: Redirecionar após a atualização
      // navigate("/admin/imoveis");
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      setMessage(`Erro ao atualizar imóvel: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (isFetchingProperty) {
    return (
      <FormContainer>
        <FormTitle>Carregando Imóvel...</FormTitle>
        <Message>Buscando dados do imóvel. Por favor, aguarde.</Message>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Editar Imóvel</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título do Imóvel</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={propertyData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição</Label>
          <TextArea
            id="description"
            name="description"
            value={propertyData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">Endereço</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={propertyData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={propertyData.neighborhood}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">Cidade</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={propertyData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="state">Estado</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={propertyData.state}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Tipo de Imóvel</Label>
          <Select
            id="type"
            name="type"
            value={propertyData.type}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="chacara">Chácara</option>
            <option value="loja">Loja/Comercial</option>
            <option value="terreno">Terreno</option>
            <option value="outros">Outros</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={propertyData.status}
            onChange={handleChange}
            required
          >
            <option value="for_sale">À Venda</option>
            <option value="for_rent">Para Alugar</option>
            <option value="sold">Vendido</option>
            <option value="rented">Alugado</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bedrooms">Quartos</Label>
          <Input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={propertyData.bedrooms}
            onChange={handleChange}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="area">Área (m²)</Label>
          <Input
            type="number"
            id="area"
            name="area"
            value={propertyData.area}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="ownerName">Nome do Proprietário</Label>
          <Input
            type="text"
            id="ownerName"
            name="ownerName"
            value={propertyData.ownerName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="ownerPhone">Telefone do Proprietário</Label>
          <Input
            type="tel"
            id="ownerPhone"
            name="ownerPhone"
            value={propertyData.ownerPhone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {/* NOVO CAMPO: Código do Projeto */}
        <FormGroup>
          <Label htmlFor="projectCode">Código do Projeto</Label>
          <Input
            type="text"
            id="projectCode"
            name="projectCode"
            value={propertyData.projectCode}
            onChange={handleChange}
          />
        </FormGroup>

        {/* NOVO CAMPO: Vagas na Garagem */}
        <FormGroup>
          <Label htmlFor="garageSpaces">Vagas na Garagem</Label>
          <Input
            type="number"
            id="garageSpaces"
            name="garageSpaces"
            value={propertyData.garageSpaces}
            onChange={handleChange}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="images">Fotos do Imóvel</Label>
          {/* Pré-visualização de imagens EXISTENTES */}
          <ImagePreviewContainer>
            {currentImageUrls.map((src, index) => (
              <ImagePreview key={src}>
                <img src={src} alt={`Existente ${index}`} />
                <RemoveImageButton
                  type="button"
                  onClick={() => handleRemoveExistingImage(src)}
                >
                  X
                </RemoveImageButton>
              </ImagePreview>
            ))}
          </ImagePreviewContainer>

          {/* Input para NOVAS imagens */}
          <Input
            type="file"
            id="newImages"
            name="newImages"
            accept="image/*"
            multiple
            onChange={handleNewImageChange}
            style={{ marginTop: "1rem" }}
          />
          {/* Pré-visualização de NOVAS imagens */}
          <ImagePreviewContainer>
            {newImagePreviews.map((src, index) => (
              <ImagePreview key={index}>
                <img src={src} alt={`Nova ${index}`} />
                <RemoveImageButton
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                >
                  X
                </RemoveImageButton>
              </ImagePreview>
            ))}
          </ImagePreviewContainer>
        </FormGroup>

        {message && <Message type={messageType}>{message}</Message>}

        <ButtonGroup>
          <Button type="submit" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Imóvel"}
          </Button>
          <Button
            type="button"
            $background="var(--color-red)"
            $color="white"
            onClick={() => navigate("/admin/imoveis")}
            disabled={loading}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default EditPropertiesPage;
