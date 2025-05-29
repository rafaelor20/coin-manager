import styled from 'styled-components';

export default function Page({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  background-color: #8C11BE;
  padding: 5%;
`;
