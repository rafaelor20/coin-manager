import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
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
  LinksSection,
} from '../../components/Auth';
import Link from '../../components/Link';
import useSignUp from '../../hooks/api/useSignUp';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (!email || !password) {
      toast.warning('Por favor, preencha todos os campos!');
      return;
    }

    if (password.length < 4) {
      toast.warning('A senha deve conter no mínimo 4 caracteres!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }

    try {
      await signUp(email, password);
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/');
    } catch (error) {
      toast.error('Não foi possível criar a conta. Verifique os dados!');
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
              Criar <span>Conta</span>
            </Title>
            <Subtitle>Comece a gerenciar suas finanças e empréstimos de forma simples e segura.</Subtitle>
          </HeaderSection>

          <FormSection onSubmit={submit}>
            <Input
              label="E-mail"
              type="email"
              icon={<FiMail />}
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Senha"
              type="password"
              icon={<FiLock />}
              placeholder="Crie uma senha segura (mín. 4 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmar Senha"
              type="password"
              icon={<FiLock />}
              placeholder="Digite a senha novamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" fullWidth loading={loadingSignUp} icon={<FiUserPlus />}>
              Cadastrar Conta
            </Button>
          </FormSection>

          <LinksSection>
            <Link to="/">Já possui uma conta? Faça login aqui</Link>
          </LinksSection>
        </AuthCard>
      </Container>
    </Page>
  );
}
