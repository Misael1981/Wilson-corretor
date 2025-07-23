import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Styled Components (mantidos os mesmos)
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
  min-height: 100px;
  resize: vertical;
  &:focus {
    border-color: var(--color-blue, #0f1e2e);
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 30, 46, 0.1);
  }
`;

const ContentTextArea = styled(TextArea)`
  min-height: 250px;
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

const CurrentImagePreview = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    max-width: 150px;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const EditArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useAuth();
  const storage = getStorage();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [currentPublishedAt, setCurrentPublishedAt] = useState(null); // Novo estado para guardar o publishedAt original

  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [initialLoadError, setInitialLoadError] = useState(null);

  const generateSlug = (titleText) => {
    return titleText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

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

  const handleRemoveImage = async () => {
    if (window.confirm("Tem certeza que deseja remover a imagem atual?")) {
      if (imageUrl) {
        try {
          // Extrai o caminho do arquivo da URL completa do Firebase Storage
          const path = imageUrl.split("?")[0].split("%2F").pop(); // Pega o último segmento após %2F (/)
          const imageRef = ref(storage, `articles_images/${path}`); // Recria a referência com o caminho correto
          await deleteObject(imageRef);
          console.log("Imagem antiga excluída do Storage.");
        } catch (error) {
          console.error("Erro ao excluir imagem antiga do Storage:", error);
        }
      }
      setImageUrl("");
      setSelectedImage(null);
      setMessage("Imagem removida com sucesso!");
      setMessageType("success");
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

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!id) {
        setInitialLoadError("ID do artigo não fornecido na URL.");
        setLoading(false);
        return;
      }
      try {
        const articleDocRef = doc(db, "articles", id);
        const articleSnapshot = await getDoc(articleDocRef);

        if (articleSnapshot.exists()) {
          const data = articleSnapshot.data();
          setTitle(data.title || "");
          setSlug(data.slug || generateSlug(data.title || ""));
          setAuthor(data.author || userData?.name || "");
          setStatus(data.status || "draft");
          setCategory(data.category || "");
          setTags(data.tags ? data.tags.join(", ") : "");
          setSummary(data.summary || "");
          setContentMarkdown(data.content || ""); // Pega do campo 'content'
          setImageUrl(data.imageUrl || "");
          setSelectedImage(null);
          // Guarda o valor original de publishedAt
          setCurrentPublishedAt(data.publishedAt || null);
        } else {
          setInitialLoadError("Artigo não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao carregar artigo para edição:", err);
        setInitialLoadError("Não foi possível carregar o artigo para edição.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setUploadProgress(0);

    let finalImageUrl = imageUrl;

    try {
      if (selectedImage) {
        setMessage("Fazendo upload da nova imagem...");
        setMessageType("info");
        finalImageUrl = await uploadImage();
        if (!finalImageUrl) {
          setLoading(false);
          return;
        }
      }

      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const updatedArticle = {
        title,
        slug: slug || generateSlug(title),
        author,
        status,
        category,
        tags: parsedTags,
        summary,
        content: contentMarkdown,
        imageUrl: finalImageUrl || null,
        updatedAt: new Date(),
      };

      // Lógica para publishedAt:
      // Se o status mudou para 'published' E não havia data de publicação antes
      if (status === "published" && !currentPublishedAt) {
        updatedArticle.publishedAt = new Date();
      }
      // Se o status mudou para 'draft' E havia uma data de publicação antes
      else if (status === "draft" && currentPublishedAt) {
        updatedArticle.publishedAt = null; // Remove a data de publicação
      }
      // Caso contrário (status não mudou OU já era published), não faz nada com publishedAt
      // Se updatedArticle.publishedAt for null, o updateDoc irá remover o campo do Firestore

      const articleDocRef = doc(db, "articles", id);
      await updateDoc(articleDocRef, updatedArticle);

      setMessage("Artigo atualizado com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/admin/artigos");
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar artigo:", error);
      setMessage("Erro ao atualizar artigo. Por favor, tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <FormContainer>
        <p>Carregando artigo...</p>
      </FormContainer>
    );
  }

  if (initialLoadError) {
    return (
      <FormContainer>
        <p style={{ color: "red" }}>{initialLoadError}</p>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <PageTitle>Editar Artigo</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título do Artigo</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
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
          {imageUrl && !selectedImage && (
            <CurrentImagePreview>
              <img src={imageUrl} alt="Imagem atual do artigo" />
              <button type="button" onClick={handleRemoveImage}>
                Remover Imagem
              </button>
            </CurrentImagePreview>
          )}
          <FileInputContainer>
            <label htmlFor="imageUpload">
              {selectedImage
                ? selectedImage.name
                : imageUrl
                ? "Mudar Imagem"
                : "Selecionar Imagem"}
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
          <ContentTextArea
            id="contentMarkdown"
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            required
            placeholder={`# Título do Artigo\n\nEste é um **parágrafo** com texto em *negrito* e _itálico_.\n\n- Item de lista 1\n- Item de lista 2\n\n\`\`\`javascript\nconsole.log("Código de exemplo");\n\`\`\``}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Processando..." : "Atualizar Artigo"}
        </SubmitButton>

        {message && <Message type={messageType}>{message}</Message>}
      </Form>
    </FormContainer>
  );
};

export default EditArticlePage;
