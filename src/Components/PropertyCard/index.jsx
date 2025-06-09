// src/Components/PropertyCard/index.jsx (CÓDIGO CORRIGIDO)
import React from "react"; // Sempre bom importar React
import styled from "styled-components";

// Seus estilos para o card individual (reutilizando os que te passei antes)
const CardStylized = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--color-blue);
  margin: 0;
`;

const CardPrice = styled.p`
  font-family: var(--font-text);
  font-size: 1.1rem;
  color: var(--color-golden);
  font-weight: bold;
  margin: 0;
`;

const CardDescription = styled.p`
  font-family: var(--font-text);
  font-size: 0.95rem;
  color: var(--color-dark-gray);
  margin: 0;
`;

// O componente PropertyCard precisa receber a prop 'property'
const PropertyCard = ({ property }) => {
  // <--- RECEBENDO A PROP 'PROPERTY'
  // Verificação simples para garantir que 'property' existe antes de tentar acessá-la
  if (!property) {
    return <div>Dados do imóvel não disponíveis.</div>;
  }

  return (
    <CardStylized>
      {/* Usando property.imageUrl para a imagem, e property.title para o alt */}
      <CardImage src={property.imageUrl} alt={property.title} />
      <CardContent>
        {/* Usando as propriedades do objeto 'property' */}
        <CardTitle>{property.title}</CardTitle>
        <CardPrice>{property.price}</CardPrice>
        <CardDescription>{property.description}</CardDescription>
        {/* Você pode adicionar mais detalhes aqui, se quiser */}
      </CardContent>
    </CardStylized>
  );
};

export default PropertyCard;
