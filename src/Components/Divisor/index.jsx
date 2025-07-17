import React from "react";
import styled from "styled-components";

const DivisorContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
`;

const Linha = styled.div`
  flex-grow: 1;
  border-top: 1px solid #6b7280;
`;

const TextoCentral = styled.span`
  flex-shrink: 0;
  margin-left: 16px;
  margin-right: 16px;
  color: #313030;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const Divisor = ({ children }) => {
  return (
    <DivisorContainer>
      <Linha />
      <TextoCentral>{children}</TextoCentral> <Linha />
    </DivisorContainer>
  );
};

export default Divisor;
