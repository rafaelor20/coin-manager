import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiUserPlus,
  FiCreditCard,
  FiUsers,
  FiList
} from 'react-icons/fi';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Registrar Recebimento',
      desc: 'Entrada de valores e receitas',
      path: '/moneyIn',
      icon: <FiArrowDownLeft />,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.15)',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      title: 'Registrar Pagamento',
      desc: 'Saída de valores e despesas',
      path: '/moneyOut',
      icon: <FiArrowUpRight />,
      color: '#F43F5E',
      bg: 'rgba(244, 63, 94, 0.15)',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)'
    },
    {
      title: 'Conceder Empréstimo',
      desc: 'Dinheiro emprestado a receber',
      path: '/credit',
      icon: <FiUserPlus />,
      color: '#38BDF8',
      bg: 'rgba(14, 165, 233, 0.15)',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)'
    },
    {
      title: 'Registrar Dívida',
      desc: 'Compromissos a quitar',
      path: '/debt',
      icon: <FiCreditCard />,
      color: '#FB923C',
      bg: 'rgba(245, 158, 11, 0.15)',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    },
    {
      title: 'Ver Empréstimos',
      desc: 'Listar e liquidar créditos',
      path: '/listCredits',
      icon: <FiUsers />,
      color: '#A855F7',
      bg: 'rgba(168, 85, 247, 0.15)',
      gradient: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)'
    },
    {
      title: 'Ver Dívidas',
      desc: 'Listar e quitar dívidas',
      path: '/listDebts',
      icon: <FiList />,
      color: '#F43F5E',
      bg: 'rgba(244, 63, 94, 0.15)',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)'
    }
  ];

  return (
    <Container>
      <SectionTitleRow>
        <SectionTitle>Ações Rápidas & Gestão</SectionTitle>
      </SectionTitleRow>

      <Grid>
        {actions.map((action) => (
          <ActionCard
            key={action.path}
            onClick={() => navigate(action.path)}
          >
            <IconContainer color={action.color} bg={action.bg}>
              {action.icon}
            </IconContainer>
            <ActionInfo>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDesc>{action.desc}</ActionDesc>
            </ActionInfo>
          </ActionCard>
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
`;

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.button`
  background: rgba(18, 24, 38, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);

  &:hover {
    background: rgba(28, 36, 56, 0.85);
    border-color: rgba(99, 102, 241, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const IconContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  transition: transform 0.2s ease;

  ${ActionCard}:hover & {
    transform: scale(1.08);
  }
`;

const ActionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
`;

const ActionTitle = styled.span`
  font-size: 0.92rem;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.2;
`;

const ActionDesc = styled.span`
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
