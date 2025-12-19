import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Page from '../../components/Page';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Container, Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import useResetPassword from '../../hooks/api/useResetPassword';

import logo from '../../assets/logo.png';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingResetPassword, resetPassword } = useResetPassword();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword || password.length < 4) {
      toast('As senhas devem ser iguais e ter no mínimo 4 caracteres!');
    } else {
      try {
        await resetPassword({ token, password });
        toast('Senha redefinida com sucesso! Por favor, faça login.');
        navigate('/');
      } catch (error) {
        toast('Não foi possível redefinir a senha!');
      }
    }
  }

  return (
    <Page>
      <Container>
        <Row>
          <img src={logo} alt="Coin Manager Logo" width="140px" />
          <Title>Coin Manager</Title>
        </Row>
        <Row>
          <Label></Label>
          <form onSubmit={submit}>
            <Input
              label="Token"
              type="text"
              fullWidth
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Password again"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" color="primary" fullWidth disabled={loadingResetPassword}>
              RESET PASSWORD
            </Button>
          </form>
        </Row>
        <Row>
          <Link to="/">return to login page</Link>
        </Row>
      </Container>
    </Page>
  );
}

