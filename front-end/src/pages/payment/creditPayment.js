import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiDollarSign,
  FiCheckCircle
} from 'react-icons/fi';

import getCreditById from '../../hooks/api/getCreditById';
import payCredit from '../../hooks/api/payCredit';

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

export default function CreditPayment() {
  const { creditId } = useParams();
  const navigate = useNavigate();

  const [credit, setCredit] = useState(null);
  const [amount, setAmount] = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { useGetCreditById } = getCreditById();
  const { payCredit: registerPayCredit } = payCredit();

  useEffect(() => {
    const fetchCredit = async() => {
      try {
        const response = await useGetCreditById(creditId);
        setCredit(response);
      } catch (error) {
        toast.error('Erro ao buscar detalhes do empréstimo.');
      }
    };

    if (creditId) {
      fetchCredit();
    }
  }, [creditId]);

  const handleQuickFill = () => {
    if (credit?.amount) {
      setAmount(String(credit.amount));
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.warning('Informe um valor de recebimento válido maior que zero.');
      return;
    }

    if (credit && parsedAmount > credit.amount) {
      toast.warning('O valor informado é maior que o saldo devedor restante.');
      return;
    }

    setLoadingPayment(true);
    try {
      await registerPayCredit(credit.id, { amount: parsedAmount });
      toast.success('Recebimento/Baixa registrada com sucesso!');
      navigate('/listCredits');
    } catch (error) {
      toast.error('Erro ao processar recebimento: ' + (error.message || ''));
      setLoadingPayment(false);
    }
  };

  const formattedDate = credit?.payDate
    ? new Date(credit.payDate).toLocaleDateString('pt-BR')
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
          text="Receber Empréstimo"
          subtitle="Registre o pagamento recebido referente ao empréstimo concedido"
          to="/listCredits"
        />

        <Main>
          {credit && (
            <DetailsCard>
              <HeaderSection>
                <TitleGroup>
                  <SectionTitle>Detalhes do Empréstimo</SectionTitle>
                  <SectionSubtitle>ID #{credit.id}</SectionSubtitle>
                </TitleGroup>
                <StatusBadge type="credit">Em Aberto</StatusBadge>
              </HeaderSection>

              <BalanceCard type="credit">
                <BalanceInfo>
                  <BalanceLabel>Saldo Restante a Receber</BalanceLabel>
                  <CurrentAmount type="credit">
                    {formatCurrency(credit.amount)}
                  </CurrentAmount>
                </BalanceInfo>
              </BalanceCard>

              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>Devedor</DetailLabel>
                  <DetailValue>{credit.debtor || 'Não informado'}</DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>Data Prevista</DetailLabel>
                  <DetailValue>{formattedDate}</DetailValue>
                </DetailItem>

                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Descrição</DetailLabel>
                  <DetailValue>
                    {credit.description || 'Sem descrição cadastrada'}
                  </DetailValue>
                </DetailItem>
              </DetailsGrid>
            </DetailsCard>
          )}

          <FormCard>
            <HeaderSection>
              <TitleGroup>
                <SectionTitle>Registrar Liquidação / Baixa</SectionTitle>
                <SectionSubtitle>
                  Informe o valor recebido (integral ou parcial)
                </SectionSubtitle>
              </TitleGroup>
            </HeaderSection>

            <PaymentForm onSubmit={handleSubmit}>
              <Input
                label="Valor Recebido (R$)"
                type="number"
                step="0.01"
                min="0.01"
                max={credit?.amount || undefined}
                placeholder="0,00"
                icon={<FiDollarSign />}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              {credit?.amount && (
                <QuickFillRow>
                  <QuickFillButton type="button" onClick={handleQuickFill}>
                    Receber Valor Total ({formatCurrency(credit.amount)})
                  </QuickFillButton>
                </QuickFillRow>
              )}

              <Button
                type="submit"
                variant="success"
                fullWidth
                loading={loadingPayment}
                icon={<FiCheckCircle />}
              >
                Confirmar Recebimento
              </Button>
            </PaymentForm>
          </FormCard>
        </Main>
      </Container>
    </Page>
  );
}
