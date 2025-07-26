import styled from "styled-components";

export const CardRecentlyAddedStylized = styled.div`
  width: 100%;
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 0.5rem;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--color-golden);
    overflow: hidden; /* Garante que o texto não transborde */
    text-overflow: ellipsis;
    text-align: center;
    padding: 0.5rem;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ImageCardRecentlyAddedContainer = styled.div`
  width: 7rem;
  flex-grow: 1;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 1rem;
  }
`;

export const ContentCardRecentlyAdded = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;

  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-golden);
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 1rem;
    }
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--color-golden);
  }
`;
