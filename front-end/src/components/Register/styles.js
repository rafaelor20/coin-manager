import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  gap: 1.5rem;
`;

export const FormCard = styled.div`
  width: 100%;
  background: rgba(18, 24, 38, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
    border-radius: 16px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.25rem;
`;

export const FormIconBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  background: ${(props) => props.bg || 'rgba(99, 102, 241, 0.15)'};
  color: ${(props) => props.color || '#818cf8'};
  border: 1px solid ${(props) => props.border || 'rgba(99, 102, 241, 0.3)'};
  flex-shrink: 0;
`;

export const FormHeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
`;

export const FormSubtitle = styled.p`
  font-size: 0.82rem;
  color: #94a3b8;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
`;
