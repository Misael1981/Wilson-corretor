import styled from "styled-components";

const ButtonStylized = styled.button`
  flex: 1;

  background: linear-gradient(
    170deg,
    rgba(15, 27, 41, 1) 0%,
    rgba(44, 72, 102, 1) 48%,
    #041120 100%
  );
  color: var(--color-golden);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.8rem;
  border: none;
  border-radius: 0.6rem;
`;

const Button = ({ children }) => {
  return <ButtonStylized>{children}</ButtonStylized>;
};

export default Button;
