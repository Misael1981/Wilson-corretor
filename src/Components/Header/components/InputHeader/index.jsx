import styled from "styled-components";

const InputHeaderStylized = styled.div`
  margin-top: 5rem;
  width: 100%;
  border: 2px solid var(--color-golden);
  border-radius: 0.3rem;
  background-color: #051b35;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background-color: transparent;
    color: #ccc;
    border: none;
    outline: 0;
  }
  button {
    font-size: 0.75rem;
    padding: 8px 16px;
    background: var(--color-golden);
    color: var(--color-blue);
    font-weight: 700;
    border: none;
    cursor: pointer;
    position: relative;
    clip-path: polygon(10% 0, 100% 0, 100% 40%, 90% 100%, 0 100%, 0 60%);
    transition: background 0.3s ease;

    &:hover {
      background: #e0a655;
    }
  }
`;

const InputHeader = () => {
  return (
    <InputHeaderStylized>
      <input type="text" placeholder="O que você procura?" />
      <button>Pesquisar</button>
    </InputHeaderStylized>
  );
};

export default InputHeader;
