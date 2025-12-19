import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Page from '../../components/Page';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Container, Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import useForgotPassword from '../../hooks/api/useForgotPassword';

import logo from '../../assets/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const { loadingForgotPassword, forgotPassword } = useForgotPassword();

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      await forgotPassword(email);
      toast('Um token de redefinição de senha foi enviado para o seu e-mail.');
      navigate('/reset-password');
    } catch (error) {
      toast('Não foi possível fazer o reset de senha!');
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
              label="E-mail"
              type="text"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" color="primary" fullWidth disabled={loadingForgotPassword}>
              Request Password Reset
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

