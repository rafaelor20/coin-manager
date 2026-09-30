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

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const DetailsCard = styled.div`
  background: rgba(18, 24, 38, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);

  @media (max-width: 600px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #f8fafc;
`;

export const SectionSubtitle = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.type === 'debt'
      ? 'rgba(244, 63, 94, 0.15)'
      : 'rgba(56, 189, 248, 0.15)'};
  color: ${(props) => (props.type === 'debt' ? '#fb7185' : '#38bdf8')};
  border: 1px solid
    ${(props) =>
    props.type === 'debt'
      ? 'rgba(244, 63, 94, 0.3)'
      : 'rgba(56, 189, 248, 0.3)'};
`;

export const BalanceCard = styled.div`
  background: ${(props) =>
    props.type === 'debt'
      ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)'
      : 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)'};
  border: 1px solid
    ${(props) =>
    props.type === 'debt'
      ? 'rgba(244, 63, 94, 0.25)'
      : 'rgba(56, 189, 248, 0.25)'};
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const BalanceLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
`;

export const CurrentAmount = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: ${(props) => (props.type === 'debt' ? '#fb923c' : '#38bdf8')};
  letter-spacing: -0.02em;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.75rem 1rem;
  border-radius: 12px;
`;

export const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const DetailValue = styled.span`
  font-size: 0.95rem;
  color: #f8fafc;
  font-weight: 500;
`;

export const FormCard = styled.div`
  background: rgba(18, 24, 38, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);

  @media (max-width: 600px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

export const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
`;

export const QuickFillRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -0.35rem;
`;

export const QuickFillButton = styled.button`
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818cf8;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.25);
    color: #fff;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;
