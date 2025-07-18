import styled from "styled-components";

const FeaturedStylized = styled.section`
  width: 40rem;
  height: 40rem;
  max-width: 90vw;
  box-sizing: border-box;
  padding: 2rem;
  border: 1px solid var(--color-golden);
  border-radius: 1rem;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  h2,
  p {
    background-color: var(--color-blue);
    color: #fff;
    padding: 0.5rem;
    margin: 0;
  }
`;

const TagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagItem = styled.li`
  background-color: var(--color-golden);
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const FeaturedArticleCard = ({ article }) => {
  if (!article) return null;

  return (
    <FeaturedStylized backgroundImage={article.imageUrl}>
      <TagsList>
        {article.tags.map((tag, index) => (
          <TagItem key={index}>
            <span>{tag}</span>
          </TagItem>
        ))}
      </TagsList>
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
    </FeaturedStylized>
  );
};

export default FeaturedArticleCard;
