import styled from "styled-components";

export const RecentlyAddedContainer = styled.aside`
  width: 100%;
  max-width: 25rem; /* Largura fixa para a sidebar */
  padding: 1.5rem;
  background: var(--degrade-blue);
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  margin: 0 auto; /* Centraliza em telas menores */

  @media screen and (min-width: 1120px) {
    margin: 0; /* Remove margin-auto em telas maiores */
  }
`;

export const RecentlyAddedTitle = styled.h3`
  font-family: var(--font-title);
  color: var(--color-golden);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const RecentlyAddedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
