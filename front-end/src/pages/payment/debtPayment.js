import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiDollarSign,
  FiCheckCircle
} from 'react-icons/fi';

import getDebtById from '../../hooks/api/getDebtById';
import payDebt from '../../hooks/api/payDebt';

import {
  Container,
  Main,
  DetailsCard,
  HeaderSection,
  TitleGroup,
  SectionTitle,
  SectionSubtitle,
  StatusBadge,
  BalanceCard,
  BalanceInfo,
  BalanceLabel,
  CurrentAmount,
  DetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  FormCard,
  PaymentForm,
  QuickFillRow,
  QuickFillButton
} from '../../components/Payment/styles';
import Header from '../../components/Header';
import Page from '../../components/Page';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';

export default function DebtPayment() {
  const { debtId } = useParams();
  const navigate = useNavigate();

  const [debt, setDebt] = useState(null);
  const [amount, setAmount] = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { useGetDebtById } = getDebtById();
  const { payDebt: registerPayDebt } = payDebt();

  useEffect(() => {
    const fetchDebt = async() => {
      try {
        const response = await useGetDebtById(debtId);
        setDebt(response);
      } catch (error) {
        toast.error('Erro ao buscar detalhes da dívida.');
      }
    };

    if (debtId) {
      fetchDebt();
    }
  }, [debtId]);

  const handleQuickFill = () => {
    if (debt?.amount) {
      setAmount(String(debt.amount));
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.warning('Informe um valor de pagamento válido maior que zero.');
      return;
    }

    if (debt && parsedAmount > debt.amount) {
      toast.warning('O valor informado é maior que o total da dívida.');
      return;
    }

    setLoadingPayment(true);
    try {
      await registerPayDebt(debt.id, { amount: parsedAmount });
      toast.success('Pagamento de dívida registrado com sucesso!');
      navigate('/listDebts');
    } catch (error) {
      toast.error('Erro ao processar pagamento: ' + (error.message || ''));
      setLoadingPayment(false);
    }
  };

  const formattedDate = debt?.payDate
    ? new Date(debt.payDate).toLocaleDateString('pt-BR')
    : 'Sem data definida';

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
          text="Pagar Dívida"
          subtitle="Realize o pagamento total ou amortização parcial do seu débito"
          to="/listDebts"
        />

        <Main>
          {debt && (
            <DetailsCard>
              <HeaderSection>
                <TitleGroup>
                  <SectionTitle>Detalhes do Débito</SectionTitle>
                  <SectionSubtitle>ID #{debt.id}</SectionSubtitle>
                </TitleGroup>
                <StatusBadge type="debt">Pendente</StatusBadge>
              </HeaderSection>

              <BalanceCard type="debt">
                <BalanceInfo>
                  <BalanceLabel>Valor Total Pendente</BalanceLabel>
                  <CurrentAmount type="debt">
                    {formatCurrency(debt.amount)}
                  </CurrentAmount>
                </BalanceInfo>
              </BalanceCard>

              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>Credor</DetailLabel>
                  <DetailValue>{debt.creditor || 'Não informado'}</DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Vencimento</DetailLabel>
                  <DetailValue>{formattedDate}</DetailValue>
                </DetailItem>

                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Descrição</DetailLabel>
                  <DetailValue>
                    {debt.description || 'Sem descrição cadastrada'}
                  </DetailValue>
                </DetailItem>
              </DetailsGrid>
            </DetailsCard>
          )}

          <FormCard>
            <HeaderSection>
              <TitleGroup>
                <SectionTitle>Realizar Pagamento / Amortização</SectionTitle>
                <SectionSubtitle>
                  Informe o valor a ser quitado
                </SectionSubtitle>
              </TitleGroup>
            </HeaderSection>

            <PaymentForm onSubmit={handleSubmit}>
              <Input
                label="Valor a Pagar (R$)"
                type="number"
                step="0.01"
                min="0.01"
                max={debt?.amount || undefined}
                placeholder="0,00"
                icon={<FiDollarSign />}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              {debt?.amount && (
                <QuickFillRow>
                  <QuickFillButton type="button" onClick={handleQuickFill}>
                    Pagar Valor Total ({formatCurrency(debt.amount)})
                  </QuickFillButton>
                </QuickFillRow>
              )}

              <Button
                type="submit"
                variant="danger"
                fullWidth
                loading={loadingPayment}
                icon={<FiCheckCircle />}
              >
                Confirmar Pagamento
              </Button>
            </PaymentForm>
          </FormCard>
        </Main>
      </Container>
    </Page>
  );
}
