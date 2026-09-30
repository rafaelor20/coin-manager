import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
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
import saveCredit from '../../hooks/api/saveCredit';

export default function Credit() {
  const [amount, setAmount] = useState('');
  const [debtor, setDebtor] = useState('');
  const [payDate, setPayDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveCredit: saveCreditFunction } = saveCredit();
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

    if (!debtor.trim()) {
      toast.warning('Informe o nome da pessoa ou entidade que tomou o empréstimo.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: parsedAmount,
        debtor: debtor.trim()
      };

      if (description.trim()) {
        payload.description = description.trim();
      }

      if (payDate) {
        const selectedDate = new Date(payDate + 'T12:00:00');
        payload.payDate = selectedDate.toISOString();
      }

      await saveCreditFunction(payload);

      toast.success('Empréstimo registrado com sucesso!');
      navigate('/listCredits');
    } catch (error) {
      const msg =
        error.response?.data?.details?.join?.(', ') ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erro ao registrar empréstimo.';
      toast.error('Erro ao registrar empréstimo: ' + msg);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header
          text="Conceder Empréstimo"
          subtitle="Cadastre valores emprestados a receber de terceiros"
          to="/listCredits"
        />

        <FormCard>
          <FormHeader>
            <FormIconBadge
              bg="rgba(14, 165, 233, 0.15)"
              color="#38BDF8"
              border="rgba(14, 165, 233, 0.3)"
            >
              <FiUsers />
            </FormIconBadge>
            <FormHeaderText>
              <FormTitle>Novo Empréstimo Concedido</FormTitle>
              <FormSubtitle>
                Preencha os dados do devedor e a data prevista de acerto
              </FormSubtitle>
            </FormHeaderText>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Valor Emprestado (R$)"
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
              label="Nome do Devedor"
              type="text"
              placeholder="Ex: João Silva, Maria Santos, Empresa X"
              icon={<FiUser />}
              value={debtor}
              onChange={(e) => setDebtor(e.target.value)}
              required
            />
            <Input
              label="Descrição / Motivo (Opcional)"
              type="text"
              placeholder="Ex: Empréstimo para compra de equipamento"
              icon={<FiFileText />}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Data Prevista para Pagamento (Opcional)"
              type="date"
              min={minDate}
              helperText="A data de vencimento deve ser a partir de amanhã"
              icon={<FiCalendar />}
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={<FiCheckCircle />}
            >
              Registrar Empréstimo
            </Button>
          </StyledForm>
        </FormCard>
      </Container>
    </Page>
  );
}
