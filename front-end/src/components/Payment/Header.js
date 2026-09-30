import React from 'react';
import Header from '../Header';

export default function PaymentHeader({ text = 'Pagamento', to = '/home', subtitle }) {
  return <Header text={text} to={to} subtitle={subtitle} />;
}
