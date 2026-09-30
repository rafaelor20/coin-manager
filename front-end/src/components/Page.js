import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import useToken from '../hooks/useToken';

export default function Page({
  children,
  showNav,
  showFooter = true,
  maxWidth = '1200px'
}) {
  const token = useToken();
  const shouldShowNav = showNav !== undefined ? showNav : !!token;

  return (
    <PageWrapper>
      {/* Background Ambient Glows */}
      <BackgroundGlow top="-100px" left="-100px" color="rgba(99, 102, 241, 0.15)" />
      <BackgroundGlow top="30%" right="-150px" color="rgba(139, 92, 246, 0.12)" />
      <BackgroundGlow bottom="-100px" left="20%" color="rgba(16, 185, 129, 0.08)" />

      {shouldShowNav && <Navbar />}

      <MainContent maxWidth={maxWidth} hasNav={shouldShowNav}>
        {children}
      </MainContent>

      {showFooter && <Footer />}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-dark);
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${(props) => (props.hasNav ? '2rem 1.5rem 6rem' : '2rem 1.5rem')};
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: ${(props) => (props.hasNav ? '1.25rem 1rem 5.5rem' : '1.25rem 1rem')};
  }
`;

const BackgroundGlow = styled.div`
  position: fixed;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: ${(props) => props.color};
  top: ${(props) => props.top || 'auto'};
  bottom: ${(props) => props.bottom || 'auto'};
  left: ${(props) => props.left || 'auto'};
  right: ${(props) => props.right || 'auto'};
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    filter: blur(80px);
  }
`;
