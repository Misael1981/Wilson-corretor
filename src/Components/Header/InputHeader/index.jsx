import styled from "styled-components";

const InputHeaderStylized = styled.div`
  margin-top: 5rem;
  width: 100%;
  border: 2px solid var(--color-golden);
  border-radius: 0.3rem;
  background-color: #051b35;
  box-sizing: border-box;
  box-sizing: border-box;
<<<<<<< HEAD
  padding: 0.3rem;
=======
  padding: 0.5rem;
>>>>>>> 060a3a11933365002666540e4d8458f4c18f9275
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (width > 1024px) {
    margin: auto 0;
    max-width: 20rem;
  }

  input {
    background-color: transparent;
    color: #ccc;
    border: none;
    outline: 0;
    max-width: 60%;
  }
  button {
    font-size: 0.75rem;
<<<<<<< HEAD
    padding: 6px 12px;
=======
    padding: 8px 16px;
>>>>>>> 060a3a11933365002666540e4d8458f4c18f9275
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
