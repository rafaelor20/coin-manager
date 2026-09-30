import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiKey, FiLock, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
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
import useResetPassword from '../../hooks/api/useResetPassword';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingResetPassword, resetPassword } = useResetPassword();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  async function submit(event) {
    event.preventDefault();

    if (!token || !password || !confirmPassword) {
      toast.warning('Por favor, preencha todos os campos!');
      return;
    }

    if (password.length < 4) {
      toast.warning('A nova senha deve ter no mínimo 4 caracteres!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }

    try {
      await resetPassword({ token, password });
      toast.success('Senha redefinida com sucesso! Faça login com sua nova senha.');
      navigate('/');
    } catch (error) {
      toast.error('Não foi possível redefinir a senha. Verifique o token informado.');
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
              Redefinir <span>Senha</span>
            </Title>
            <Subtitle>Insira o token recebido por e-mail e defina sua nova senha de acesso.</Subtitle>
          </HeaderSection>

          <FormSection onSubmit={submit}>
            <Input
              label="Token de Recuperação"
              type="text"
              icon={<FiKey />}
              placeholder="Cole aqui o token recebido"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <Input
              label="Nova Senha"
              type="password"
              icon={<FiLock />}
              placeholder="Nova senha (mín. 4 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmar Nova Senha"
              type="password"
              icon={<FiLock />}
              placeholder="Digite a nova senha novamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" fullWidth loading={loadingResetPassword} icon={<FiCheckCircle />}>
              Confirmar Nova Senha
            </Button>
          </FormSection>

          <LinksSection>
            <Link to="/">
              <FiArrowLeft /> Voltar para o Login
            </Link>
          </LinksSection>
        </AuthCard>
      </Container>
    </Page>
  );
}
