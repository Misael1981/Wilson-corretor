import styled from "styled-components";

export const DetailPageContainer = styled.div`
  width: 95vw;
  max-width: 85rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 0;

  @media screen and (min-width: 1120px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const DetailMainContainer = styled.div`
  padding: 2rem;
  width: 80vw;
  max-width: 50rem;
  margin: 0 auto;
  background: var(--degrade-blue);
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
`;

export const PropertyTitle = styled.h1`
  font-family: var(--font-title);
  color: var(--color-golden);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PropertySubtitle = styled.h2`
  color: var(--color-gray);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const PropertyPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-golden);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const PropertyDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const DetailItem = styled.div`
  color: #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const PropertyDescription = styled.div`
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 2rem;
`;

export const ContactButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--degrade-whatsapp);
  color: #ccc;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--color-dark-green);
  }
`;
