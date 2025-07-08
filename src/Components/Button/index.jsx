import styled from "styled-components";

const ButtonStylized = styled.button`
  flex: 1;

  background: ${(props) => props.background || "var(--degrade-blue)"};
  color: ${(props) => props.color || "var(--color-golden)"};
  font-size: ${(props) => props.fontSize || "1.3rem"};
  font-weight: 700;
  padding: 0.8rem;
  cursor: pointer;
  border: none;
  border-radius: 0.6rem;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Button = ({ children, background, color, fontSize }) => {
  return (
    <ButtonStylized background={background} color={color} fontSize={fontSize}>
      {children}
    </ButtonStylized>
  );
};

export default Button;
