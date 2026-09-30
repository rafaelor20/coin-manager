import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';

import Page from '../../components/Page';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
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
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loadingSignIn, signIn } = useSignIn();
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (!email || !password) {
      toast.warning('Preencha seu e-mail e senha!');
      return;
    }

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast.success('Login realizado com sucesso!');
      navigate('/home');
    } catch (err) {
      toast.error('E-mail ou senha inválidos!');
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
              Coin<span>Manager</span>
            </Title>
            <Subtitle>Registre suas finanças por aqui.</Subtitle>
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" fullWidth loading={loadingSignIn} icon={<FiLogIn />}>
              Entrar na Conta
            </Button>
          </FormSection>

          <LinksSection>
            <Link to="/sign-up">Não tem uma conta? Cadastre-se aqui</Link>
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </LinksSection>
        </AuthCard>
      </Container>
    </Page>
  );
}
