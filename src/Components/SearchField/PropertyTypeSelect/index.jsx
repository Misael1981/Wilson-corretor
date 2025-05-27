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
  font-size: 1.2rem;
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
          <option value="apartamento">
            <input type="checkbox" />
            Apartamento
          </option>
          <option value="casa">
            <input type="checkbox" />
            Casa
          </option>
          <option value="cobertura">
            <input type="checkbox" />
            Cobertura
          </option>
          <option value="flat">
            <input type="checkbox" />
            Flat
          </option>
          <option value="sobrado">
            <input type="checkbox" />
            Sobrado
          </option>
        </optgroup>
        <optgroup label="Comercial">
          <option value="consultório">
            <input type="checkbox" />
            Consultório
          </option>
          <option value="galpao/deposito/armazem">
            <input type="checkbox" />
            Galpão/Depósito/Armazém
          </option>
          <option value="imovel-comercial">
            <input type="checkbox" />
            Imóvel Comercial
          </option>
          <option value="box">
            <input type="checkbox" />
            Ponto Comercial/Loja/Box
          </option>
        </optgroup>
        <optgroup label="Outros Tipos">
          <option value="lote">
            <input type="checkbox" />
            Lote/Terreno
          </option>
          <option value="fazenda">
            <input type="checkbox" />
            Fazenda
          </option>
          <option value="sitio">
            <input type="checkbox" />
            Sítios
          </option>
          <option value="Chácara">
            <input type="checkbox" />
            Chácaras
          </option>
        </optgroup>
      </SelectStylezed>
    </ContainerPropertysStylezed>
  );
};

export default PropertyTypeSelect;
