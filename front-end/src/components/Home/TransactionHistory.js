import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiSearch,
  FiInbox,
  FiCalendar
} from 'react-icons/fi';

export default function TransactionHistory({ transactions = [] }) {
  const [filterType, setFilterType] = useState('all'); // 'all', 'in', 'out'
  const [searchQuery, setSearchQuery] = useState('');

  // Reverse transactions to show newest first
  const reversed = [...transactions].reverse();

  // Filter transactions
  const filteredTransactions = reversed.filter((item) => {
    const isIncome = item.amount > 0;
    const isExpense = item.amount < 0;

    if (filterType === 'in' && !isIncome) return false;
    if (filterType === 'out' && !isExpense) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchEntity = item.entity?.toLowerCase().includes(q);
      return matchDesc || matchEntity;
    }

    return true;
  });

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    const absNum = Math.abs(num);
    const formatted = absNum.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${num < 0 ? '-' : '+'} R$ ${formatted}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--/--';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '--/--';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  return (
    <Container>
      <HeaderRow>
        <TitleGroup>
          <Title>Extrato de Movimentações</Title>
          <Subtitle>
            {filteredTransactions.length} movimentação(ões) encontrada(s)
          </Subtitle>
        </TitleGroup>

        {/* Filter Tabs */}
        <FilterTabs>
          <FilterTab
            active={filterType === 'all'}
            onClick={() => setFilterType('all')}
          >
            Todos
          </FilterTab>
          <FilterTab
            active={filterType === 'in'}
            onClick={() => setFilterType('in')}
            type="in"
          >
            Recebimentos
          </FilterTab>
          <FilterTab
            active={filterType === 'out'}
            onClick={() => setFilterType('out')}
            type="out"
          >
            Pagamentos
          </FilterTab>
        </FilterTabs>
      </HeaderRow>

      {/* Search Bar */}
      <SearchBarWrapper>
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Buscar por descrição ou entidade..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <ClearSearchButton onClick={() => setSearchQuery('')}>
            Limpar
          </ClearSearchButton>
        )}
      </SearchBarWrapper>

      {/* Transactions List */}
      <ListWrapper>
        {filteredTransactions.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FiInbox />
            </EmptyIcon>
            <EmptyTitle>Nenhuma movimentação registrada</EmptyTitle>
            <EmptyDesc>
              {searchQuery || filterType !== 'all'
                ? 'Nenhum resultado corresponde aos filtros selecionados.'
                : 'Utilize os botões de ação rápida para registrar recebimentos ou pagamentos.'}
            </EmptyDesc>
          </EmptyState>
        ) : (
          filteredTransactions.map((tx) => {
            const isNegative = tx.amount < 0;
            return (
              <TransactionItem key={tx.id || Math.random()}>
                <LeftContent>
                  <IconBadge isNegative={isNegative}>
                    {isNegative ? <FiArrowUpRight /> : <FiArrowDownLeft />}
                  </IconBadge>
                  <InfoCol>
                    <DescriptionText>
                      {tx.description || (isNegative ? 'Pagamento' : 'Recebimento')}
                    </DescriptionText>
                    <MetaRow>
                      <DateBadge>
                        <FiCalendar /> {formatDate(tx.createdAt)}
                      </DateBadge>
                      {tx.entity && (
                        <EntityBadge>
                          {tx.entity}
                        </EntityBadge>
                      )}
                    </MetaRow>
                  </InfoCol>
                </LeftContent>

                <AmountBadge isNegative={isNegative}>
                  {formatCurrency(tx.amount)}
                </AmountBadge>
              </TransactionItem>
            );
          })
        )}
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: rgba(18, 24, 38, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  @media (max-width: 600px) {
    padding: 1rem;
    border-radius: 16px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
`;

const Subtitle = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.15rem;
`;

const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.25rem;
  border-radius: 10px;
  gap: 0.2rem;
`;

const FilterTab = styled.button`
  background: ${(props) =>
    props.active
      ? props.type === 'in'
        ? 'rgba(16, 185, 129, 0.2)'
        : props.type === 'out'
          ? 'rgba(244, 63, 94, 0.2)'
          : 'rgba(99, 102, 241, 0.2)'
      : 'transparent'};
  color: ${(props) =>
    props.active
      ? props.type === 'in'
        ? '#34d399'
        : props.type === 'out'
          ? '#fb7185'
          : '#818cf8'
      : '#94a3b8'};
  border: ${(props) =>
    props.active
      ? props.type === 'in'
        ? '1px solid rgba(16, 185, 129, 0.4)'
        : props.type === 'out'
          ? '1px solid rgba(244, 63, 94, 0.4)'
          : '1px solid rgba(99, 102, 241, 0.4)'
      : '1px solid transparent'};
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: ${(props) => (props.active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #f8fafc;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
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
  padding: 0.7rem 0.85rem;
  font-size: 0.9rem;
  color: #f8fafc;

  &::placeholder {
    color: #64748b;
  }
`;

const ClearSearchButton = styled.button`
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

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 0.25rem;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.85rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: 1;
  min-width: 0;
`;

const IconBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  background: ${(props) =>
    props.isNegative ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)'};
  color: ${(props) => (props.isNegative ? '#fb7185' : '#34d399')};
  border: 1px solid
    ${(props) =>
    props.isNegative
      ? 'rgba(244, 63, 94, 0.3)'
      : 'rgba(16, 185, 129, 0.3)'};
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const DescriptionText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #f8fafc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: #94a3b8;

  svg {
    font-size: 0.8rem;
  }
`;

const EntityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 0.72rem;
  color: #cbd5e1;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AmountBadge = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  color: ${(props) => (props.isNegative ? '#fb7185' : '#34d399')};

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  gap: 0.6rem;
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  color: #475569;
`;

const EmptyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #cbd5e1;
`;

const EmptyDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  max-width: 320px;
`;
