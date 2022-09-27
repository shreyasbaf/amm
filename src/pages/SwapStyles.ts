import styled from "styled-components";
import swapImage from "../images/swap.svg"
import { theme } from "../styles/theme";
export const SwapContainerMain = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
`;

export const SwapOuterDiv = styled.div`
max-width: 420px;
width: 100%;
background: rgb(255, 253, 250);
box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
  rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
border-radius: 20px;
padding: 1rem;
/* margin: 40px 0px; */
`;

export const SwapInterDiv = styled.div`
display: flex;
flex-direction: column;
`;

export const SwapHeadingDiv = styled.div`
display: flex;
flex-direction: row;
-webkit-box-pack: center;
justify-content: center;
`;

export const SwapHeading = styled.div`
color: ${theme.primaryColor};
box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
  rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
border-radius: 10px;
padding: 1rem;
margin: 0px 10px;
cursor: pointer;
/* border: 1px solid #10363d; */
`;

export const ArrowSign = styled.div`
  background-image: url(${swapImage});
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
`;

export const SwapButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: none;
  background-color: ${theme.primaryColor};
  border: none;
  margin: 10px;
  color: white;
  border: 1px solid ${theme.primaryColor};
  transition: all 0.5s linear 0s;
  :hover{
    opacity: 0.9;
    scale: 1.05;
    background-color: ${(props) => (props.disabled ? `${theme.red}` : `${theme.primaryColor}`)};
  }
`;
