import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  error,
  helperText,
  disabled,
  required,
  style,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <InputGroup style={style} className={className}>
      {label && (
        <Label>
          {label} {required && <Required>*</Required>}
        </Label>
      )}
      <InputWrapper hasError={!!error}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          disabled={disabled}
          required={required}
          hasIcon={!!icon}
          hasToggle={isPassword}
          {...props}
        />
        {isPassword && (
          <TogglePasswordButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
            aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </TogglePasswordButton>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputGroup>
  );
};

export default Input;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #cbd5e1;
  letter-spacing: 0.01em;
  line-height: 1.2;
`;

const Required = styled.span`
  color: #f43f5e;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  min-height: 48px;
  background-color: #111827;
  border: 1px solid
    ${(props) => (props.hasError ? '#f43f5e' : 'rgba(255, 255, 255, 0.12)')};
  border-radius: 12px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  overflow: hidden;

  &:focus-within {
    border-color: ${(props) => (props.hasError ? '#f43f5e' : '#818cf8')};
    box-shadow: 0 0 0 3px
      ${(props) =>
    props.hasError
      ? 'rgba(244, 63, 94, 0.2)'
      : 'rgba(99, 102, 241, 0.25)'};
    background-color: #0f172a;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.9rem;
  color: #64748b;
  font-size: 1.15rem;
  flex-shrink: 0;
  pointer-events: none;
`;

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 46px;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${(props) => (props.hasIcon ? '0.65rem' : '1rem')};
  padding-right: ${(props) => (props.hasToggle ? '0.5rem' : '1rem')};
  font-size: 0.95rem;
  color: #f8fafc !important;
  font-family: inherit;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::placeholder {
    color: #64748b;
    font-size: 0.9rem;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Autofill styling override */
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px #111827 inset !important;
    -webkit-text-fill-color: #f8fafc !important;
    caret-color: #f8fafc !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Custom styling for date input */
  &[type='date'] {
    color-scheme: dark;
    font-family: inherit;
    font-size: 0.9rem;
    min-width: 0;
  }

  &[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
    opacity: 0.7;
    margin-right: 0.25rem;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 1;
    }
  }

  /* Remove spin buttons on number inputs for clean look */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    opacity: 0.4;
  }
`;

const TogglePasswordButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: #94a3b8;
  padding: 0 0.9rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #f8fafc;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.78rem;
  color: #fb7185;
  margin-top: 0.1rem;
`;

const HelperText = styled.span`
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 0.1rem;
`;
