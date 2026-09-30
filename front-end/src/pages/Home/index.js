import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import getTransactions from '../../hooks/api/getTransactions';
import getCredits from '../../hooks/api/getCredits';
import getDebts from '../../hooks/api/getDebts';

import Page from '../../components/Page';
import StatCards from '../../components/Home/StatCards';
import QuickActions from '../../components/Home/QuickActions';
import TransactionHistory from '../../components/Home/TransactionHistory';

export default function Home() {
  const { useGetTransactions } = getTransactions();
  const { useGetCredits } = getCredits();
  const { useGetDebts } = getDebts();

  const [transactions, setTransactions] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalDebts, setTotalDebts] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const txResponse = await useGetTransactions();
        if (Array.isArray(txResponse)) {
          setTransactions(txResponse);
        }
      } catch (error) {
        toast.error('Erro ao buscar transações: ' + (error.message || ''));
      }

      try {
        const credResponse = await useGetCredits();
        if (Array.isArray(credResponse)) {
          const sumCred = credResponse.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
          setTotalCredits(sumCred);
        }
      } catch (error) {
        // Silently handle if credits fail
      }

      try {
        const debtResponse = await useGetDebts();
        if (Array.isArray(debtResponse)) {
          const sumDebt = debtResponse.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
          setTotalDebts(sumDebt);
        }
      } catch (error) {
        // Silently handle if debts fail
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      const sum = transactions.reduce((total, t) => total + (Number(t.amount) || 0), 0);
      const inc = transactions
        .filter((t) => Number(t.amount) > 0)
        .reduce((total, t) => total + Number(t.amount), 0);
      const exp = transactions
        .filter((t) => Number(t.amount) < 0)
        .reduce((total, t) => total + Math.abs(Number(t.amount)), 0);

      setCurrentAmount(sum);
      setTotalIncome(inc);
      setTotalExpense(exp);
    }
  }, [transactions]);

  return (
    <Page>
      <DashboardContainer>
        {/* Top Financial Stats */}
        <StatCards
          currentAmount={currentAmount}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          totalCredits={totalCredits}
          totalDebts={totalDebts}
        />

        {/* Quick Action Navigation Grid */}
        <QuickActions />

        {/* Main Content: Transactions Feed */}
        <MainSection>
          <TransactionHistory transactions={transactions} />
        </MainSection>
      </DashboardContainer>
    </Page>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
