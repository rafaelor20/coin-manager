import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Header({ text, to, subtitle, rightElement }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton onClick={handleBack} type="button" title="Voltar">
          <FiArrowLeft />
        </BackButton>
        <TitleGroup>
          <PageTitle>{text}</PageTitle>
          {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
        </TitleGroup>
      </LeftSection>
      {rightElement && <RightSection>{rightElement}</RightSection>}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    color: #818cf8;
    transform: translateX(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 1.65rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 1.35rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.2rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
