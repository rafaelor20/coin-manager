import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiArrowDownLeft, FiArrowUpRight, FiUsers, FiCreditCard, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';
import UserContext from '../contexts/UserContext';

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUserData({});
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/home', icon: <FiHome /> },
    { label: 'Recebimentos', path: '/moneyIn', icon: <FiArrowDownLeft /> },
    { label: 'Pagamentos', path: '/moneyOut', icon: <FiArrowUpRight /> },
    { label: 'Empréstimos', path: '/listCredits', icon: <FiUsers /> },
    { label: 'Dívidas', path: '/listDebts', icon: <FiCreditCard /> },
  ];

  const email = userData?.email || userData?.user?.email || '';
  const userInitial = email ? email.charAt(0).toUpperCase() : 'U';
  const userEmail = email || 'Usuário';

  return (
    <>
      <NavContainer>
        <NavWrapper>
          <BrandLink to="/home">
            <LogoIconWrapper>
              <FaCoins />
            </LogoIconWrapper>
            <BrandText>
              Coin<span>Manager</span>
            </BrandText>
          </BrandLink>

          {/* Desktop Navigation Links */}
          <NavMenu>
            {navItems.map((item) => (
              <StyledNavLink key={item.path} to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                {item.icon}
                <span>{item.label}</span>
              </StyledNavLink>
            ))}
          </NavMenu>

          {/* User actions */}
          <UserSection>
            <UserBadge title={userEmail}>
              <UserAvatar>{userInitial}</UserAvatar>
              <UserEmailText>{userEmail}</UserEmailText>
            </UserBadge>
            <LogoutButton onClick={handleLogout} title="Sair da Conta">
              <FiLogOut />
              <LogoutLabel>Sair</LogoutLabel>
            </LogoutButton>

            {/* Mobile Menu Hamburger Toggle */}
            <MobileToggle onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </MobileToggle>
          </UserSection>
        </NavWrapper>
      </NavContainer>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <MobileDrawerBackdrop onClick={() => setMobileMenuOpen(false)}>
          <MobileDrawerContent onClick={(e) => e.stopPropagation()}>
            <DrawerHeader>
              <BrandLink to="/home" onClick={() => setMobileMenuOpen(false)}>
                <LogoIconWrapper>
                  <FaCoins />
                </LogoIconWrapper>
                <BrandText>
                  Coin<span>Manager</span>
                </BrandText>
              </BrandLink>
              <CloseDrawerButton onClick={() => setMobileMenuOpen(false)}>
                <FiX />
              </CloseDrawerButton>
            </DrawerHeader>

            <DrawerUserCard>
              <UserAvatar size="large">{userInitial}</UserAvatar>
              <DrawerUserInfo>
                <DrawerUserName>Conectado</DrawerUserName>
                <DrawerUserEmail>{userEmail}</DrawerUserEmail>
              </DrawerUserInfo>
            </DrawerUserCard>

            <DrawerNavLinks>
              {navItems.map((item) => (
                <DrawerNavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <DrawerNavIcon>{item.icon}</DrawerNavIcon>
                  <span>{item.label}</span>
                </DrawerNavLink>
              ))}
            </DrawerNavLinks>

            <DrawerFooter>
              <DrawerLogoutButton onClick={handleLogout}>
                <FiLogOut />
                <span>Encerrar Sessão</span>
              </DrawerLogoutButton>
            </DrawerFooter>
          </MobileDrawerContent>
        </MobileDrawerBackdrop>
      )}

      {/* Mobile Sticky Bottom Nav Bar for fast smartphone navigation */}
      <BottomNav>
        {navItems.map((item) => (
          <BottomNavItem key={item.path} to={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <BottomNavIcon>{item.icon}</BottomNavIcon>
            <BottomNavText>{item.label}</BottomNavText>
          </BottomNavItem>
        ))}
      </BottomNav>
    </>
  );
}

const NavContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(9, 13, 22, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const BrandLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
`;

const LogoIconWrapper = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
`;

const BrandText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #f8fafc;

  span {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  @media (max-width: 960px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #fff;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    font-weight: 600;

    svg {
      color: #818cf8;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.75rem 0.3rem 0.3rem;
  border-radius: 30px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  width: ${(props) => (props.size === 'large' ? '46px' : '28px')};
  height: ${(props) => (props.size === 'large' ? '46px' : '28px')};
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.size === 'large' ? '1.2rem' : '0.8rem')};
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
`;

const UserEmailText = styled.span`
  font-size: 0.82rem;
  color: #cbd5e1;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.2);
  color: #fb7185;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: rgba(244, 63, 94, 0.2);
    color: #f43f5e;
    border-color: rgba(244, 63, 94, 0.4);
    transform: translateY(-1px);
  }

  @media (max-width: 960px) {
    padding: 0.45rem;
  }
`;

const LogoutLabel = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #f8fafc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/* Mobile Drawer Overlay */
const MobileDrawerBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;
`;

const MobileDrawerContent = styled.div`
  width: 280px;
  height: 100%;
  background: #0f172a;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CloseDrawerButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: #94a3b8;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DrawerUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const DrawerUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DrawerUserName = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #818cf8;
  font-weight: 600;
`;

const DrawerUserEmail = styled.span`
  font-size: 0.85rem;
  color: #e2e8f0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DrawerNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const DrawerNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #fff;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    font-weight: 600;
  }
`;

const DrawerNavIcon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const DrawerFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const DrawerLogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: rgba(244, 63, 94, 0.12);
  border: 1px solid rgba(244, 63, 94, 0.25);
  color: #fb7185;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(244, 63, 94, 0.2);
    color: #f43f5e;
  }
`;

/* Bottom Navigation Bar for Smartphone */
const BottomNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 23, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.4rem 0.25rem;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const BottomNavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.35rem 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.68rem;
  font-weight: 500;
  border-radius: 8px;
  min-width: 54px;
  transition: all 0.2s ease;

  &.active {
    color: #818cf8;

    svg {
      transform: translateY(-2px);
      color: #818cf8;
    }
  }
`;

const BottomNavIcon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
`;

const BottomNavText = styled.span`
  line-height: 1;
`;
