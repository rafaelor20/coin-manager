import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const SummaryBanner = styled.div`
  background: ${(props) =>
    props.type === 'debt'
      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)'
      : 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid
    ${(props) =>
    props.type === 'debt'
      ? 'rgba(245, 158, 11, 0.3)'
      : 'rgba(56, 189, 248, 0.3)'};
  border-radius: 18px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    padding: 1.25rem;
  }
`;

export const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SummaryLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
`;

export const CurrentAmount = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: ${(props) => (props.type === 'debt' ? '#fb923c' : '#38bdf8')};
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

export const SummaryCount = styled.span`
  font-size: 0.85rem;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
