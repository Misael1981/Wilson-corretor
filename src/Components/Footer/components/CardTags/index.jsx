import { Link } from "react-router-dom";
import styled from "styled-components";
import TitleFooter from "../TitleFooter";

const CardTagsStylized = styled.div`
  padding: 0 1rem;
  width: 800px;
  text-align: center;
  border-top: 1px solid var(--color-golden);
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 0 auto;
`;

const TagLink = styled(Link)`
  background-color: var(--color-gray-light);
  color: var(--color-dark-gray);
  padding: 0.6rem 1rem;
  border-radius: 0.8rem;
  text-decoration: none;
  font-size: 0.75rem;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: var(--color-blue);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CardTags = () => {
  const tagsData = [
    { text: "Imóvel para venda", to: "/imoveis?status=venda" },
    { text: "Apartamento", to: "/imoveis?tipo=apartamento" },
    { text: "Casa", to: "/imoveis?tipo=casa" },
    {
      text: "Imóvel para venda em Pouso Alegre - MG",
      to: "/imoveis?status=venda&cidade=pouso-alegre",
    },
    {
      text: "Apartamento para venda em Pouso Alegre - MG",
      to: "/imoveis?tipo=apartamento&status=venda&cidade=pouso-alegre",
    },
    {
      text: "Casa para venda em Pouso Alegre - MG com 3 quartos ou mais",
      to: "/imoveis?tipo=casa&quartos=3&cidade=pouso-alegre",
    },
    {
      text: "Imóvel de R$ 150.000,00 até R$ 180.000,00",
      to: "/imoveis?precoMin=150000&precoMax=180000",
    },
    { text: "Imóvel para locação", to: "/imoveis?status=locacao" },
    {
      text: "Chácara a venda no sul de Minas",
      to: "/imoveis?tipo=chacara&regiao=sul-minas",
    },
    {
      text: "Apartamento e Casa para venda em Pouso Alegre - MG",
      to: "/imoveis?tipos=apartamento,casa&status=venda&cidade=pouso-alegre",
    },
    {
      text: "Imóvel em Senador José Bento - MG",
      to: "/imoveis?cidade=senador-jose-bento",
    },
    {
      text: "Apartamento para venda",
      to: "/imoveis?tipo=apartamento&status=venda",
    },
  ];
  return (
    <CardTagsStylized>
      <TitleFooter>Buscas Frequentes</TitleFooter>
      <TagsContainer>
        {tagsData.map((tag, index) => (
          <TagLink key={index} to={tag.to}>
            {tag.text}
          </TagLink>
        ))}
      </TagsContainer>
    </CardTagsStylized>
  );
};

export default CardTags;
