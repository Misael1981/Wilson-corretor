import styled from "styled-components";
import ContatoDrawer from "./ContatoDrawer";
import ButtonLogin from "../ButtonLogin";
import AuthButton from "../AuthButton";

const ListButtonsStylized = styled.div`
  @media screen and (width > 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ContainerContact = styled.div`
  @media screen and (width > 1024px) {
    display: none;
  }
  @media screen and (width > 1124px) {
    display: flex;
    order: -1;
    border: none;
    padding: 0;
  }

  svg {
    padding: 0 0.5rem 0 0;
    font-size: 1.5rem;
  }
`;

const ListButtons = () => {
  return (
    <ListButtonsStylized>
      <AuthButton />
      <ContainerContact>
        <ContatoDrawer />
      </ContainerContact>
    </ListButtonsStylized>
  );
};

export default ListButtons;
