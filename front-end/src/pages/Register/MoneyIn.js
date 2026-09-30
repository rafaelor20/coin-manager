import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowDownLeft,
  FiDollarSign,
  FiUser,
  FiFileText,
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
import saveTransaction from '../../hooks/api/saveTransaction';

export default function MoneyIn() {
  const [amount, setAmount] = useState('');
  const [entity, setEntity] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { saveTransaction: saveTransactionFunction } = saveTransaction();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.warning('Informe um valor válido maior que zero.');
      return;
    }

    setLoading(true);
    try {
      await saveTransactionFunction({
        amount: parsedAmount,
        entity: entity.trim() || 'Recebimento',
        description: description.trim() || 'Recebimento'
      });

      toast.success('Recebimento registrado com sucesso!');
      navigate('/home');
    } catch (error) {
      const msg =
        error.response?.data?.details?.join?.(', ') ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erro ao registrar recebimento.';
      toast.error('Erro ao registrar recebimento: ' + msg);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header
          text="Registrar Recebimento"
          subtitle="Adicione uma nova entrada de valor ao seu saldo"
          to="/home"
        />

        <FormCard>
          <FormHeader>
            <FormIconBadge
              bg="rgba(16, 185, 129, 0.15)"
              color="#10B981"
              border="rgba(16, 185, 129, 0.3)"
            >
              <FiArrowDownLeft />
            </FormIconBadge>
            <FormHeaderText>
              <FormTitle>Nova Entrada Financeira</FormTitle>
              <FormSubtitle>
                Preencha os detalhes do valor recebido
              </FormSubtitle>
            </FormHeaderText>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            <Input
              label="Valor (R$)"
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
              label="Origem / Pagador (Opcional)"
              type="text"
              placeholder="Ex: Salário, Cliente, Freelance, Venda"
              icon={<FiUser />}
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
            />
            <Input
              label="Descrição (Opcional)"
              type="text"
              placeholder="Ex: Pagamento referente ao projeto X"
              icon={<FiFileText />}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="success"
              fullWidth
              loading={loading}
              icon={<FiCheckCircle />}
            >
              Confirmar Recebimento
            </Button>
          </StyledForm>
        </FormCard>
      </Container>
    </Page>
  );
}
