import React from 'react';
import styled from 'styled-components';
import { FaCoins } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent>
        <FooterBrand>
          <FaCoins />
          <span>Coin Manager</span>
        </FooterBrand>
        <FooterText>
          &copy; {year} Coin Manager &bull; Gestão Financeira Pessoal &bull; Todos os direitos reservados.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(9, 13, 22, 0.6);
  padding: 1.5rem 1rem;
  margin-top: auto;
  z-index: 10;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #818cf8;
  font-size: 0.9rem;
  font-weight: 700;
`;

const FooterText = styled.p`
  font-size: 0.8rem;
  color: #64748b;
`;
