import React from 'react';
import Header from '../Header';

export default function HomeHeader({ text = 'Dashboard', subtitle }) {
  return <Header text={text} subtitle={subtitle} />;
}
