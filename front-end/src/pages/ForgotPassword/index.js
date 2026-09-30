import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiSend, FiArrowLeft, FiKey } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';

import Page from '../../components/Page';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import {
  Container,
  AuthCard,
  HeaderSection,
  LogoBadge,
  Title,
  Subtitle,
  FormSection,
  LinksSection
} from '../../components/Auth';
import Link from '../../components/Link';
import useForgotPassword from '../../hooks/api/useForgotPassword';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { loadingForgotPassword, forgotPassword } = useForgotPassword();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (!email) {
      toast.warning('Por favor, informe seu e-mail cadastrado.');
      return;
    }

    try {
      await forgotPassword(email);
      toast.success('Token de recuperação enviado para o seu e-mail!');
      navigate('/reset-password');
    } catch (error) {
      toast.error('Não foi possível solicitar a recuperação de senha.');
    }
  }

  return (
    <Page showNav={false}>
      <Container>
        <AuthCard>
          <HeaderSection>
            <LogoBadge>
              <FaCoins />
            </LogoBadge>
            <Title>
              Recuperar <span>Senha</span>
            </Title>
            <Subtitle>
              Informe seu e-mail para receber as instruções e o token de redefinição.
            </Subtitle>
          </HeaderSection>

          <FormSection onSubmit={submit}>
            <Input
              label="E-mail Cadastrado"
              type="email"
              icon={<FiMail />}
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loadingForgotPassword}
              icon={<FiSend />}
            >
              Enviar Token de Recuperação
            </Button>
          </FormSection>

          <LinksSection>
            <Link to="/reset-password">
              <FiKey /> Já possui um token? Redefinir senha
            </Link>
            <Link to="/">
              <FiArrowLeft /> Voltar para o Login
            </Link>
          </LinksSection>
        </AuthCard>
      </Container>
    </Page>
  );
}
