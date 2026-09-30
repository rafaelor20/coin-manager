import styled from 'styled-components';
import Link from '../Link';
import PropTypes from 'prop-types';

export default function RegisterButton(props) {
  RegisterButton.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };
  return (
    <StyledLink to={props.to}>
      <RegisterButtonDiv>
        <span>{props.text}</span>
      </RegisterButtonDiv>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  flex: 1 1 calc(50% - 10px);
  min-width: 140px;
`;

const RegisterButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.9rem 1rem;
  background: var(--primary-gradient);
  color: #fff;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  }
`;
