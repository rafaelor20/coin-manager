import React from 'react';
import Header from '../Header';

export default function ListHeader({ text = 'Empréstimos', to = '/home', subtitle }) {
  return <Header text={text} to={to} subtitle={subtitle} />;
}
