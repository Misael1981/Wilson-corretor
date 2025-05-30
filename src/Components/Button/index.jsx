import styled from "styled-components";

const ButtonStylized = styled.button`
  flex: 1;

  background: ${(props) =>
    props.isGolden ? "var(--degrade-golden)" : "var(--degrade-blue)"};
  color: ${(props) =>
    props.isGolden ? "var(--color-blue)" : "var(--color-golden)"};
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.8rem;
  border: none;
  border-radius: 0.6rem;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Button = ({ children, isGolden, ...props }) => {
  return (
    <ButtonStylized isGolden={isGolden} {...props}>
      {children}
    </ButtonStylized>
  );
};

export default Button;
