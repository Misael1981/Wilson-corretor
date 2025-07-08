import styled from "styled-components";

const ContainerTitleStylized = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  padding-bottom: 4rem;
`;

const TitleStylized = styled.h2`
  color: var(--color-blue);
  padding: 0;
  margin: 0;
  font-family: var(--font-title);
  font-size: 1.8rem;
  text-align: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: 7rem;
    height: 0.5rem;
    background-color: var(--color-blue);
  }
`;

const Title = ({ children }) => {
  return (
    <ContainerTitleStylized>
      <TitleStylized>{children}</TitleStylized>
    </ContainerTitleStylized>
  );
};

export default Title;
