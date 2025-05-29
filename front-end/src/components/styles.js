import styled from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #8C11BE;
  font-family: Arial, sans-serif;
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: #fff;
  text-align: center;
  padding: 5px 0px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 42vh;
  width: 95%;
`;

export const CurrentAmount = styled.div`
  width: 90%;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ButtonsDiv = styled.div`
  width: 95%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 0px;
  max-width: calc(100px * 4);
`;
