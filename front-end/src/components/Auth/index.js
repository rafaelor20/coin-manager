import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  width: 100%;
  padding: 1.5rem 1rem;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: rgba(18, 24, 38, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.25rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.4s ease-out;

  @media (max-width: 480px) {
    padding: 1.75rem 1.25rem;
    border-radius: 16px;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
`;

export const LogoBadge = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.85rem;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
  line-height: 1.2;

  span {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  max-width: 320px;
`;

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
`;

export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Label = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;
