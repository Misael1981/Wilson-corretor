import styled from "styled-components";
import { FaChartArea, FaShower } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardRecentlyAddedStylized = styled.div`
  width: 100%;
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

const ImageCardRecentlyAddedContainer = styled.div`
  width: 7rem;

  img {
    width: 100%;
    border-radius: 1rem;
  }
`;

const ContentCardRecentlyAdded = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--color-golden);
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    color: var(--color-golden);

    li {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
    }
  }
`;

const CardRecentlyAdded = ({ propertyData }) => {
  return (
    <Link to={`/imovel/${propertyData.id}`}>
      <CardRecentlyAddedStylized>
        <ImageCardRecentlyAddedContainer>
          <img src={propertyData.image} alt="" />
        </ImageCardRecentlyAddedContainer>
        <ContentCardRecentlyAdded>
          <h3>{propertyData.title}</h3>
          <ul>
            <li>
              <FaChartArea />
              <span>{propertyData.area} m&sup2;</span>
            </li>
            <li>
              <FaShower />
              <span>{propertyData.bedrooms}</span>
            </li>
          </ul>
          <h3>{propertyData.price}</h3>
        </ContentCardRecentlyAdded>
      </CardRecentlyAddedStylized>
    </Link>
  );
};

export default CardRecentlyAdded;
