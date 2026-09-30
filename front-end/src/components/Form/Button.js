import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export default function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  type = 'button',
  onClick,
  style,
  className,
  ...props
}) {
  return (
    <StyledButton
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      className={className}
      {...props}
    >
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
          <span>Aguarde...</span>
        </SpinnerWrapper>
      ) : (
        <ButtonContent>
          {icon && <ButtonIcon>{icon}</ButtonIcon>}
          <span>{children}</span>
        </ButtonContent>
      )}
    </StyledButton>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.15rem;
`;

const variantStyles = {
  primary: css`
    background: var(--primary-gradient);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);

    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
      transform: translateY(-1px);
    }
  `,
  success: css`
    background: var(--success-gradient);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);

    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
      transform: translateY(-1px);
    }
  `,
  danger: css`
    background: var(--danger-gradient);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(244, 63, 94, 0.35);

    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(244, 63, 94, 0.5);
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    background: rgba(255, 255, 255, 0.08);
    color: #f8fafc;
    border: 1px solid rgba(255, 255, 255, 0.12);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  `,
  outline: css`
    background: transparent;
    color: #818cf8;
    border: 1px solid rgba(99, 102, 241, 0.5);

    &:hover:not(:disabled) {
      background: rgba(99, 102, 241, 0.1);
      border-color: #818cf8;
      color: #fff;
    }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  height: 48px;
  min-height: 48px;
  padding: 0 1.4rem;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  ${(props) => variantStyles[props.variant] || variantStyles.primary}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
