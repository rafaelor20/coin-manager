import React from 'react';
import styled from 'styled-components';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiArrowDownLeft,
  FiArrowUpRight,
  FiUsers,
  FiCreditCard
} from 'react-icons/fi';

export default function StatCards({
  currentAmount = 0,
  totalIncome = 0,
  totalExpense = 0,
  totalCredits = 0,
  totalDebts = 0
}) {
  const formatValue = (val) => {
    const num = Number(val) || 0;
    return `R$ ${num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const isPositive = currentAmount >= 0;

  return (
    <StatsGrid>
      {/* Main Balance Hero Card */}
      <HeroCard isPositive={isPositive}>
        <HeroHeader>
          <HeroTitleWrapper>
            <HeroLabel>Saldo Atual em Conta</HeroLabel>
            <HeroValue>{formatValue(currentAmount)}</HeroValue>
          </HeroTitleWrapper>
          <HeroIconWrapper isPositive={isPositive}>
            {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
          </HeroIconWrapper>
        </HeroHeader>
        <HeroFooter>
          <HeroStatusBadge isPositive={isPositive}>
            {isPositive ? 'Posição Positiva' : 'Posição Devedora'}
          </HeroStatusBadge>
          <HeroSubtext>Atualizado em tempo real</HeroSubtext>
        </HeroFooter>
      </HeroCard>

      {/* Secondary Metric Cards */}
      <MetricsRow>
        {/* Total Income */}
        <MetricCard>
          <MetricIcon color="#10B981" bg="rgba(16, 185, 129, 0.15)">
            <FiArrowDownLeft />
          </MetricIcon>
          <MetricInfo>
            <MetricLabel>Total Recebimentos</MetricLabel>
            <MetricValue color="#34d399">{formatValue(totalIncome)}</MetricValue>
          </MetricInfo>
        </MetricCard>

        {/* Total Expense */}
        <MetricCard>
          <MetricIcon color="#F43F5E" bg="rgba(244, 63, 94, 0.15)">
            <FiArrowUpRight />
          </MetricIcon>
          <MetricInfo>
            <MetricLabel>Total Pagamentos</MetricLabel>
            <MetricValue color="#fb7185">{formatValue(totalExpense)}</MetricValue>
          </MetricInfo>
        </MetricCard>

        {/* Total Credits */}
        <MetricCard>
          <MetricIcon color="#38BDF8" bg="rgba(14, 165, 233, 0.15)">
            <FiUsers />
          </MetricIcon>
          <MetricInfo>
            <MetricLabel>Empréstimos Concedidos</MetricLabel>
            <MetricValue color="#38bdf8">{formatValue(totalCredits)}</MetricValue>
          </MetricInfo>
        </MetricCard>

        {/* Total Debts */}
        <MetricCard>
          <MetricIcon color="#FB923C" bg="rgba(245, 158, 11, 0.15)">
            <FiCreditCard />
          </MetricIcon>
          <MetricInfo>
            <MetricLabel>Dívidas Pendentes</MetricLabel>
            <MetricValue color="#fb923c">{formatValue(totalDebts)}</MetricValue>
          </MetricInfo>
        </MetricCard>
      </MetricsRow>
    </StatsGrid>
  );
}

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const HeroCard = styled.div`
  background: ${(props) =>
    props.isPositive
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(69, 10, 10, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid
    ${(props) =>
    props.isPositive
      ? 'rgba(99, 102, 241, 0.25)'
      : 'rgba(244, 63, 94, 0.35)'};
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) =>
    props.isPositive ? 'var(--primary-gradient)' : 'var(--danger-gradient)'};
  }

  @media (max-width: 600px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const HeroTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const HeroLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
`;

const HeroValue = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 2.35rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 1.85rem;
  }
`;

const HeroIconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  background: ${(props) =>
    props.isPositive
      ? 'rgba(99, 102, 241, 0.2)'
      : 'rgba(244, 63, 94, 0.2)'};
  color: ${(props) => (props.isPositive ? '#818cf8' : '#fb7185')};
  border: 1px solid
    ${(props) =>
    props.isPositive
      ? 'rgba(99, 102, 241, 0.35)'
      : 'rgba(244, 63, 94, 0.35)'};

  @media (max-width: 600px) {
    width: 42px;
    height: 42px;
    font-size: 1.3rem;
  }
`;

const HeroFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const HeroStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.isPositive
      ? 'rgba(16, 185, 129, 0.15)'
      : 'rgba(244, 63, 94, 0.15)'};
  color: ${(props) => (props.isPositive ? '#34d399' : '#fb7185')};
  border: 1px solid
    ${(props) =>
    props.isPositive
      ? 'rgba(16, 185, 129, 0.3)'
      : 'rgba(244, 63, 94, 0.3)'};
`;

const HeroSubtext = styled.span`
  font-size: 0.8rem;
  color: #64748b;
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: rgba(18, 24, 38, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(26, 34, 52, 0.8);
    transform: translateY(-2px);
  }
`;

const MetricIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
`;

const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
`;

const MetricLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetricValue = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${(props) => props.color || '#f8fafc'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
