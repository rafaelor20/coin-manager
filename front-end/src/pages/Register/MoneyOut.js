import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowUpRight,
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

export default function MoneyOut() {
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
      const negativeAmount = -1 * Math.abs(parsedAmount);

      await saveTransactionFunction({
        amount: negativeAmount,
        entity: entity.trim() || 'Despesa',
        description: description.trim() || 'Pagamento'
      });

      toast.success('Pagamento registrado com sucesso!');
      navigate('/home');
    } catch (error) {
      const msg =
        error.response?.data?.details?.join?.(', ') ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erro ao registrar pagamento.';
      toast.error('Erro ao registrar pagamento: ' + msg);
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header
          text="Registrar Pagamento"
          subtitle="Adicione uma nova saída ou despesa financeira"
          to="/home"
        />

        <FormCard>
          <FormHeader>
            <FormIconBadge
              bg="rgba(244, 63, 94, 0.15)"
              color="#F43F5E"
              border="rgba(244, 63, 94, 0.3)"
            >
              <FiArrowUpRight />
            </FormIconBadge>
            <FormHeaderText>
              <FormTitle>Nova Saída Financeira</FormTitle>
              <FormSubtitle>
                Preencha os detalhes do valor pago ou despesa
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
              label="Destino / Beneficiário (Opcional)"
              type="text"
              placeholder="Ex: Supermercado, Aluguel, Farmácia, Loja"
              icon={<FiUser />}
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
            />
            <Input
              label="Descrição (Opcional)"
              type="text"
              placeholder="Ex: Compras do mês, Conta de internet"
              icon={<FiFileText />}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="danger"
              fullWidth
              loading={loading}
              icon={<FiCheckCircle />}
            >
              Confirmar Pagamento
            </Button>
          </StyledForm>
        </FormCard>
      </Container>
    </Page>
  );
}
