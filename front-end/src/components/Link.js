import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  color: #818cf8;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  &:hover {
    color: #a5b4fc;
    text-decoration: underline;
    transform: translateY(-1px);
  }
`;
