import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FiCreditCard,
  FiDollarSign,
  FiUser,
  FiFileText,
  FiCalendar,
  FiCheckCircle
} from 'react-icons/fi';

import Page from '../../components/Page';
import Header from '../../components/Header';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import {
  Container,
  FormCard,
  FormHeader,
  FormIconBadge,
  FormHeaderText,
  FormTitle,
  FormSubtitle,
  StyledForm
} from '../../components/Register/styles';
import saveDebt from '../../hooks/api/saveDebt';

export default function Debt() {
  const [amount, setAmount] = useState('');
  const [creditor, setCreditor] = useState('');
  const [payDate, setPayDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveDebt: saveDebtFunction } = saveDebt();
  const navigate = useNavigate();

  // Get tomorrow's date string for input min attribute
  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = getTomorrowDateString();

  const handleSubmit = async(event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.warning('Informe um valor válido maior que zero.');
      return;
    }

    if (!creditor.trim()) {
      toast.warning('Informe o nome do credor (pessoa ou instituição a quem deve).');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: parsedAmount,
        creditor: creditor.trim()
      };

      if (description.trim()) {
        payload.description = description.trim();
      }

      if (payDate) {
        const selectedDate = new Date(payDate + 'T12:00:00');
        payload.payDate = selectedDate.toISOString();
      }

      await saveDebtFunction(payload);

      toast.success('Dívida registrada com sucesso!');
      navigate('/listDebts');
    } catch (error) {
      const msg =
        error.response?.data?.details?.join?.(', ') ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erro ao registrar dívida.';
      toast.error('Erro ao registrar dívida: ' + msg);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header
          text="Registrar Dívida"
          subtitle="Cadastre seus débitos e compromissos financeiros a quitar"
          to="/listDebts"
        />

        <FormCard>
          <FormHeader>
            <FormIconBadge
              bg="rgba(245, 158, 11, 0.15)"
              color="#FB923C"
              border="rgba(245, 158, 11, 0.3)"
            >
              <FiCreditCard />
            </FormIconBadge>
            <FormHeaderText>
              <FormTitle>Novo Compromisso / Débito</FormTitle>
              <FormSubtitle>
                Preencha os dados do credor e a data prevista de vencimento
              </FormSubtitle>
            </FormHeaderText>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Valor da Dívida (R$)"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              icon={<FiDollarSign />}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Input
              label="Nome do Credor"
              type="text"
              placeholder="Ex: Banco, Cartão, Carlos Silva, Fornecedor"
              icon={<FiUser />}
              value={creditor}
              onChange={(e) => setCreditor(e.target.value)}
              required
            />
            <Input
              label="Descrição (Opcional)"
              type="text"
              placeholder="Ex: Financiamento, Empréstimo pessoal"
              icon={<FiFileText />}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Data de Vencimento / Pagamento (Opcional)"
              type="date"
              min={minDate}
              helperText="A data de vencimento deve ser a partir de amanhã"
              icon={<FiCalendar />}
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
            />
            <Button
              type="submit"
              variant="danger"
              fullWidth
              loading={loading}
              icon={<FiCheckCircle />}
            >
              Registrar Dívida
            </Button>
          </StyledForm>
        </FormCard>
      </Container>
    </Page>
  );
}
