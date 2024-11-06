import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  border-radius: 8px;
  width: 320px;
  position: relative;
  z-index: 1001;
  overflow: hidden;
`;

export const Header = styled.div`
  background-color: #fff;
  padding: 12px 16px;
  box-shadow: 0px 2px 1px 0px #41516426;
  position: relative;
  z-index: 1;

  > p {
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: #415164;
    margin: 0;
    letter-spacing: -0.02em;
  }
`;

export const TopBar = styled.div`
  border-radius: 8px 8px 0 0;
  background-color: #20252B;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

export const Body = styled.div`
  background-color: #F5F6FA;
  padding: 16px 16px 24px;
`;

export const Alert = styled.div`
  background-color: #fff;
  color: #415164;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 1px 0px #41516426;

  > span {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
  }

  > p {
    margin: 8px 0px 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  } 
`;

export const Footer = styled.div`
  display: flex;
  gap: 74px;
  border-top: 1px solid #C8CED8;
  padding: 16px;
  background-color: #fff;
`;

const Button = styled.button`
  display: flex;
  border: 1px solid transparent;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding: 7px 16px;
  border-radius: 4px;
  letter-spacing: 0.02em;
  max-width: 113px;
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
`;

export const DeleteButton = styled(Button)`  
  border-color: #FFD2D1;
  color: #D20200;

  svg {
    margin-right: 8px;
    fill: #D20200;
  }
`;

export const CancelButton = styled(Button)`
  text-decoration: underline;
  border-color: transparent;
  color: #415164;
`;