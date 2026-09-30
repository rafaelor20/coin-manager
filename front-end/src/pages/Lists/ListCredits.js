import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getCredits from '../../hooks/api/getCredits';

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
import CreditContainer from '../../components/Lists/CreditHistory';
import Header from '../../components/Header';

export default function ListCredits() {
  const { useGetCredits } = getCredits();
  const [credits, setCredits] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const fetchCredits = async() => {
      try {
        const response = await useGetCredits();
        if (Array.isArray(response)) {
          setCredits(response);
        }
      } catch (error) {
        toast.error('Erro ao buscar lista de empréstimos concedidos.');
      }
    };

    fetchCredits();
  }, []);

  useEffect(() => {
    if (Array.isArray(credits)) {
      const sum = credits.reduce(
        (total, credit) => total + (Number(credit.amount) || 0),
        0
      );
      setCurrentAmount(sum);
    }
  }, [credits]);

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
          text="Empréstimos Concedidos"
          subtitle="Acompanhe e registre a liquidação de valores emprestados a terceiros"
          to="/home"
        />
        <Main>
          <Content>
            <SummaryBanner type="credit">
              <SummaryInfo>
                <SummaryLabel>Total a Receber</SummaryLabel>
                <CurrentAmount type="credit">
                  {formatCurrency(currentAmount)}
                </CurrentAmount>
              </SummaryInfo>
              <SummaryCount>
                {credits.length} empréstimo(s) ativo(s)
              </SummaryCount>
            </SummaryBanner>

            <CreditContainer credits={credits} />
          </Content>
        </Main>
      </Container>
    </Page>
  );
}
