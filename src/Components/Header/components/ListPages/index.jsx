import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

const ListPagesStylized = styled.ul`
  @media screen and (width > 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-golden);
    font-size: 1.1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #00f0ff;
    cursor: pointer;

    @media screen and (width > 1024px) {
      border: none;
      padding: 0;
      gap: 0.3rem;
    }

    &:hover {
      background-color: #102431;
    }

    button {
      background-color: transparent;
      border: 0;
      padding: 0 0.5rem 0 0;
      font-size: 1rem;
      color: var(--color-golden);
    }
  }
`;

const ListPages = () => {
  const pages = ["Home", "Imóveis", "Blog"];
  return (
    <ListPagesStylized>
      {pages.map((page) => (
        <li>
          {page}
          <button>
            <MdKeyboardArrowRight />
          </button>
        </li>
      ))}
    </ListPagesStylized>
  );
};

export default ListPages;
