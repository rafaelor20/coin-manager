import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  FiCalendar,
  FiSearch,
  FiInbox,
  FiArrowUpRight,
  FiCreditCard
} from 'react-icons/fi';
import Button from '../Form/Button';

export default function DebtContainer({ debts = [] }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const reversedDebts = [...debts].reverse();

  const filteredDebts = reversedDebts.filter((debt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchCreditor = debt.creditor?.toLowerCase().includes(q);
    const matchDesc = debt.description?.toLowerCase().includes(q);
    return matchCreditor || matchDesc;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Sem data definida';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Sem data definida';
    return d.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return `R$ ${num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <Container>
      {/* Search Header */}
      <SearchRow>
        <SearchBarWrapper>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar por credor ou descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ClearButton onClick={() => setSearchQuery('')}>Limpar</ClearButton>
          )}
        </SearchBarWrapper>

        <Button
          variant="danger"
          icon={<FiCreditCard />}
          onClick={() => navigate('/debt')}
        >
          Nova Dívida
        </Button>
      </SearchRow>

      {/* Debt List */}
      <ListGrid>
        {filteredDebts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FiInbox />
            </EmptyIcon>
            <EmptyTitle>Nenhuma dívida pendente encontrada</EmptyTitle>
            <EmptyDesc>
              {searchQuery
                ? 'Nenhuma dívida corresponde ao termo buscado.'
                : 'Parabéns! Você não possui dívidas cadastradas no momento.'}
            </EmptyDesc>
            {!searchQuery && (
              <Button
                variant="danger"
                icon={<FiCreditCard />}
                onClick={() => navigate('/debt')}
                style={{ marginTop: '0.5rem' }}
              >
                Cadastrar Dívida
              </Button>
            )}
          </EmptyState>
        ) : (
          filteredDebts.map((debt) => {
            const initial = debt.creditor
              ? debt.creditor.charAt(0).toUpperCase()
              : 'C';

            return (
              <DebtCard
                key={debt.id}
                onClick={() => navigate(`/debtPayment/${debt.id}`)}
              >
                <CardTop>
                  <CreditorInfo>
                    <Avatar>{initial}</Avatar>
                    <CreditorDetails>
                      <CreditorName>{debt.creditor || 'Credor Não Informado'}</CreditorName>
                      <DebtDescription>
                        {debt.description || 'Sem descrição'}
                      </DebtDescription>
                    </CreditorDetails>
                  </CreditorInfo>
                  <AmountBadge>{formatCurrency(debt.amount)}</AmountBadge>
                </CardTop>

                <CardBottom>
                  <DateInfo>
                    <FiCalendar />
                    <span>Vencimento: {formatDate(debt.payDate)}</span>
                  </DateInfo>
                  <ActionPill>
                    <span>Pagar / Amortizar</span>
                    <FiArrowUpRight />
                  </ActionPill>
                </CardBottom>
              </DebtCard>
            );
          })
        )}
      </ListGrid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 260px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  color: #64748b;
  font-size: 1.1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.75rem 0.85rem;
  font-size: 0.9rem;
  color: #f8fafc;

  &::placeholder {
    color: #64748b;
  }
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #94a3b8;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  margin-right: 0.6rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DebtCard = styled.div`
  background: rgba(18, 24, 38, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);

  &:hover {
    background: rgba(26, 34, 52, 0.85);
    border-color: rgba(251, 146, 60, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const CreditorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #d97706 0%, #fb923c 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
`;

const CreditorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

const CreditorName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DebtDescription = styled.p`
  font-size: 0.8rem;
  color: #94a3b8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AmountBadge = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #fb923c;
  white-space: nowrap;
  flex-shrink: 0;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #64748b;

  svg {
    color: #94a3b8;
  }
`;

const ActionPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fb7185;
  background: rgba(244, 63, 94, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(244, 63, 94, 0.2);
  transition: all 0.2s ease;

  ${DebtCard}:hover & {
    background: rgba(244, 63, 94, 0.25);
    color: #fff;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  background: rgba(18, 24, 38, 0.5);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  text-align: center;
  gap: 0.75rem;
`;

const EmptyIcon = styled.div`
  font-size: 2.75rem;
  color: #475569;
`;

const EmptyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #cbd5e1;
`;

const EmptyDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  max-width: 360px;
`;
