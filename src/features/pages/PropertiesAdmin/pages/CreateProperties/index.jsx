import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Para navegação
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage
import { db, storage } from "@/firebase"; // Importa as instâncias do db e storage
import Button from "@/Components/Button"; // Ajuste o caminho conforme sua estrutura

// Styled Components (mantidos os mesmos, pois já estão bons!)
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

const CreateProperties = () => {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    price: "",
    type: "", // 'casa', 'apartamento', 'chacara', 'loja'
    status: "for_sale", // 'for_sale', 'for_rent', 'sold'
    bedrooms: "",
    bathrooms: "",
    area: "", // Área em m²
    ownerName: "",
    ownerPhone: "",
    projectCode: "", // NOVO CAMPO: Código do Projeto
    garageSpaces: "", // NOVO CAMPO: Vagas na Garagem
    amenities: [], // Futuramente: lista de comodidades
  });

  // Estados para upload de imagens
  const [imageFiles, setImageFiles] = useState([]); // Arquivos de imagem selecionados
  const [imagePreviews, setImagePreviews] = useState([]); // URLs para pré-visualização das imagens

  // Estados para feedback do usuário
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' ou 'error'

  // Manipulador de mudança para campos de texto e select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manipulador de mudança para o input de arquivo (imagens)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    // Cria URLs para pré-visualização
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  // Manipulador para remover uma imagem da pré-visualização
  const handleRemoveImage = (indexToRemove) => {
    setImageFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  // Função para fazer upload das imagens para o Firebase Storage
  const uploadImages = async (files) => {
    const imageUrls = [];
    for (const file of files) {
      const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progresso do upload (opcional, para UI de progresso)
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload do ${file.name} está ${progress}% feito.`);
          },
          (error) => {
            console.error("Erro no upload da imagem:", error);
            reject(error);
          },
          async () => {
            // Upload completo, obtém a URL de download
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }
    return imageUrls;
  };

  // Manipulador de submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // 1. Upload das imagens para o Firebase Storage
      const uploadedImageUrls = await uploadImages(imageFiles);

      // 2. Adiciona os dados do imóvel ao Firestore
      await addDoc(collection(db, "properties"), {
        ...propertyData,
        price: parseFloat(propertyData.price), // Converte preço para número
        bedrooms: parseInt(propertyData.bedrooms), // Converte para número inteiro
        bathrooms: parseInt(propertyData.bathrooms), // Converte para número inteiro
        area: parseFloat(propertyData.area), // Converte área para número
        garageSpaces: parseInt(propertyData.garageSpaces), // NOVO: Converte vagas para número inteiro
        imageUrls: uploadedImageUrls, // Salva as URLs das imagens
        createdAt: Timestamp.now(), // Data de criação
        updatedAt: Timestamp.now(), // Data da última atualização
        // Adicionar userId do usuário logado aqui, se houver sistema de autenticação
      });

      setMessage("Imóvel cadastrado com sucesso!");
      setMessageType("success");
      // Limpa o formulário após o sucesso
      setPropertyData({
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
        projectCode: "", // Limpa o novo campo Código do Projeto
        garageSpaces: "", // Limpa o novo campo Vagas na Garagem
        amenities: [],
      });
      setImageFiles([]);
      setImagePreviews([]);

      // Opcional: Navegar para a lista de imóveis após o cadastro
      // navigate("/admin/imoveis");
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);
      setMessage(`Erro ao cadastrar imóvel: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Cadastrar Imóvel</FormTitle>
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
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="images">Fotos do Imóvel</Label>
          <Input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <ImagePreviewContainer>
            {imagePreviews.map((src, index) => (
              <ImagePreview key={index}>
                <img src={src} alt={`Preview ${index}`} />
                <RemoveImageButton
                  type="button"
                  onClick={() => handleRemoveImage(index)}
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
            {loading ? "Cadastrando..." : "Cadastrar Imóvel"}
          </Button>
          <Button
            type="button"
            $background="var(--color-red)" // Usando transient prop para o background
            $color="white" // Usando transient prop para a cor
            onClick={() => navigate("/admin/imoveis")} // Volta para a lista de imóveis
            disabled={loading}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default CreateProperties;
