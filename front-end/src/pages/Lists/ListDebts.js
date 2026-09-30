import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getDebts from '../../hooks/api/getDebts';

import {
  Container,
  Main,
  Content,
  SummaryBanner,
  SummaryInfo,
  SummaryLabel,
  CurrentAmount,
  SummaryCount
} from '../../components/Lists/styles';

import Page from '../../components/Page';
import DebtContainer from '../../components/Lists/DebtHistory';
import Header from '../../components/Header';

export default function ListDebts() {
  const { useGetDebts } = getDebts();
  const [debts, setDebts] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const fetchDebts = async() => {
      try {
        const response = await useGetDebts();
        if (Array.isArray(response)) {
          setDebts(response);
        }
      } catch (error) {
        toast.error('Erro ao buscar lista de dívidas pendentes.');
      }
    };

    fetchDebts();
  }, []);

  useEffect(() => {
    if (Array.isArray(debts)) {
      const sum = debts.reduce(
        (total, debt) => total + (Number(debt.amount) || 0),
        0
      );
      setCurrentAmount(sum);
    }
  }, [debts]);

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return `R$ ${num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <Page>
      <Container>
        <Header
          text="Dívidas Pendentes"
          subtitle="Gerencie seus débitos a pagar e realize amortizações parciais ou totais"
          to="/home"
        />
        <Main>
          <Content>
            <SummaryBanner type="debt">
              <SummaryInfo>
                <SummaryLabel>Total a Pagar</SummaryLabel>
                <CurrentAmount type="debt">
                  {formatCurrency(currentAmount)}
                </CurrentAmount>
              </SummaryInfo>
              <SummaryCount>
                {debts.length} dívida(s) cadastrada(s)
              </SummaryCount>
            </SummaryBanner>

            <DebtContainer debts={debts} />
          </Content>
        </Main>
      </Container>
    </Page>
  );
}
