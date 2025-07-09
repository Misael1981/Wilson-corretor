import styled from "styled-components";

const ContainerPropertysStylezed = styled.div`
  flex: 2;
  padding: 0;
`;

const LabelStylezed = styled.label`
  display: block;
  text-align: start;
  color: var(--color-blue);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SelectStylezed = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem;
  font-size: 1rem;
  color: var(--color-blue);
  border-radius: 0.5rem;
  border: none;
`;

const PropertyTypeSelect = () => {
  return (
    <ContainerPropertysStylezed>
      <LabelStylezed>Tipos de imóvel</LabelStylezed>
      <SelectStylezed>
        <option>Todos os imóveis</option>
        <optgroup label="Residencial">
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="cobertura">Cobertura</option>
          <option value="flat">Flat</option>
          <option value="sobrado">Sobrado</option>
        </optgroup>
        <optgroup label="Comercial">
          <option value="consultório">Consultório</option>
          <option value="galpao/deposito/armazem">
            Galpão/Depósito/Armazém
          </option>
          <option value="imovel-comercial">Imóvel Comercial</option>
          <option value="box">Ponto Comercial/Loja/Box</option>
        </optgroup>
        <optgroup label="Outros Tipos">
          <option value="lote">Lote/Terreno</option>
          <option value="fazenda">Fazenda</option>
          <option value="sitio">Sítios</option>
          <option value="Chácara">Chácaras</option>
        </optgroup>
      </SelectStylezed>
    </ContainerPropertysStylezed>
  );
};

export default PropertyTypeSelect;
