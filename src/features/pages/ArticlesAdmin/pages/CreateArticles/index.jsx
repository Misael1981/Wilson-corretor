import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Assumindo que firebase.js exporta 'db'
import { useAuth } from "@/context/AuthContext"; // Para pegar o nome do admin logado

// Importações do Firebase Storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Para gerar nomes de arquivo únicos (npm install uuid)

// Styled Components (mantidos os mesmos do código anterior, apenas para referência)
const FormContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 2rem auto;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #333;
  &:focus {
    border-color: var(--color-blue, #0f1e2e);
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 30, 46, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #333;
  min-height: 100px; /* Ajustado para summary */
  resize: vertical;
  &:focus {
    border-color: var(--color-blue, #0f1e2e);
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 30, 46, 0.1);
  }
`;

const ContentTextArea = styled(TextArea)`
  min-height: 250px; /* Altura maior para o conteúdo principal */
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  &:focus {
    border-color: var(--color-blue, #0f1e2e);
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 30, 46, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-golden, #f39c12);
  color: #fff;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: var(--color-dark-orange, #e67e22);
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  color: ${(props) => (props.type === "error" ? "red" : "green")};
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type="file"] {
    display: none;
  }

  label {
    background-color: var(--color-blue, #0f1e2e);
    color: #fff;
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--color-dark-blue, #0a141f);
    }
  }

  span {
    font-size: 0.9rem;
    color: #777;
    margin-top: 0.5rem;
  }
`;

const CreateArticles = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const storage = getStorage();

  // Estados para os campos do formulário (NOVOS CAMPOS INCLUÍDOS)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // Novo campo
  const [author, setAuthor] = useState(userData?.name || "");
  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState(""); // Novo campo
  const [tags, setTags] = useState(""); // Novo campo (string separada por vírgulas)
  const [summary, setSummary] = useState(""); // Novo campo
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Estados para feedback da UI
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  // Função para gerar o slug automaticamente a partir do título
  const generateSlug = (titleText) => {
    return titleText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
      .replace(/[\s_-]+/g, "-") // Substitui espaços e múltiplos hífens por um único hífen
      .replace(/^-+|-+$/g, ""); // Remove hífens do início/fim
  };

  // Atualiza o slug automaticamente ao digitar o título
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setMessage(null);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    const fileExtension = selectedImage.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `articles_images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Erro no upload da imagem:", error);
          setMessage("Erro ao fazer upload da imagem.");
          setMessageType("error");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImageUrl(downloadURL);
              resolve(downloadURL);
            })
            .catch((err) => {
              console.error("Erro ao obter URL de download:", err);
              setMessage("Erro ao obter URL da imagem.");
              setMessageType("error");
              reject(err);
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setUploadProgress(0);

    let finalImageUrl = imageUrl;

    try {
      if (selectedImage) {
        setMessage("Fazendo upload da imagem...");
        setMessageType("info");
        finalImageUrl = await uploadImage();
        if (!finalImageUrl) {
          setLoading(false);
          return;
        }
      }

      // Processa as tags: transforma a string separada por vírgulas em um array
      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const newArticle = {
        title,
        slug: slug || generateSlug(title), // Garante que o slug seja gerado se estiver vazio
        author,
        status,
        category, // Novo campo
        tags: parsedTags, // Novo campo (array)
        summary, // Novo campo
        content: contentMarkdown, // Renomeado de contentMarkdown para content
        imageUrl: finalImageUrl || null,
        createdAt: new Date(),
        publishedAt: status === "published" ? new Date() : null, // Renomeado para publishedAt
      };

      const docRef = await addDoc(collection(db, "articles"), newArticle);
      console.log("Artigo criado com ID:", docRef.id);

      setMessage("Artigo criado com sucesso!");
      setMessageType("success");

      // Limpa o formulário após o sucesso
      setTitle("");
      setSlug("");
      setAuthor(userData?.name || "");
      setStatus("draft");
      setCategory("");
      setTags("");
      setSummary("");
      setContentMarkdown("");
      setSelectedImage(null);
      setImageUrl("");

      setTimeout(() => {
        navigate("/admin/artigos");
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
      setMessage("Erro ao criar artigo. Por favor, tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <PageTitle>Criar Novo Artigo</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título do Artigo</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange} // Usa a nova função para atualizar título e slug
            required
            placeholder="Ex: Dicas para comprar seu primeiro imóvel"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="slug">Slug (URL Amigável)</Label>
          <Input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="Ex: dicas-comprar-primeiro-imovel"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Autor</Label>
          <Input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Nome do autor"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Categoria</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="imoveis">Imóveis</option>
            <option value="financiamento">Financiamento</option>
            <option value="decoracao">Decoração</option>
            <option value="mercado">Mercado Imobiliário</option>
            <option value="geral">Geral</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">Tags (separadas por vírgulas)</Label>
          <Input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ex: casa, apartamento, investimento"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="summary">Resumo / Descrição Curta</Label>
          <TextArea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            placeholder="Um breve resumo do artigo para exibição em listas ou prévias."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="imageUpload">Imagem de Destaque</Label>
          <FileInputContainer>
            <label htmlFor="imageUpload">
              {selectedImage ? selectedImage.name : "Selecionar Imagem"}
            </label>
            <Input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedImage && (
              <span>
                {selectedImage.name} -{" "}
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p>Progresso do Upload: {uploadProgress.toFixed(0)}%</p>
            )}
          </FileInputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contentMarkdown">Conteúdo do Artigo (Markdown)</Label>
          <ContentTextArea // Usando o styled component para o textarea de conteúdo
            id="contentMarkdown"
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            required
            placeholder={`# Título do Artigo\n\nEste é um **parágrafo** com texto em *negrito* e _itálico_.\n\n- Item de lista 1\n- Item de lista 2\n\n\`\`\`javascript\nconsole.log("Código de exemplo");\n\`\`\``}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Processando..." : "Criar Artigo"}
        </SubmitButton>

        {message && <Message type={messageType}>{message}</Message>}
      </Form>
    </FormContainer>
  );
};

export default CreateArticles;
