import styled from "styled-components";
import { theme } from "../styles/theme";

export const LiquidityContainerMain = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
font-family: 'Inter', sans-serif;
`;

export const LiquidityOuterDiv = styled.div`
max-width: 420px;
width: 100%;
background: rgb(255, 253, 250);
box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
  rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
border-radius: 20px;
padding: 1rem;  
/* margin: 40px 0px; */
`;

export const LiquidityInterDiv = styled.div`
display: flex;
flex-direction: column;
`;

export const HeadingButtonDiv = styled.div`
display: flex;
flex-direction: row;
-webkit-box-pack: center;
justify-content: center;
margin-bottom: 12px;
`;

export const AddHeading = styled.div<{ active: boolean }>`
background: ${(props) => (props.active ? `${theme.primaryColor}` : 'white')};
color: ${(props) => (props.active ? 'white' : "black")};
box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
  rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
border-radius: 10px;
padding: 1rem;
margin: 0px 10px;
cursor: pointer;
border: 1px solid ${(props) => (props.active ? 'white' : `${theme.primaryColor}`)};
align-items: center;
text-align: center;
min-width: 80px;
justify-content: center;
transition: all 0.5s linear 0s;
:hover{
  box-shadow: white 2px 2px;
  scale: 1.07;
}
`;

export const FormContainerMain = styled.div``;

export const FormInputOne = styled.div`
padding: 16px;
border-radius: 20px;
background-color: transparent;
margin: 10px;
border: 1px solid ${theme.primaryColor};
transition: all 0.5s linear 0s;
:hover{
  box-shadow: #10363dB3 2px 2px;
}
`;

export const FormInputOneHeading = styled.div`
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
`;

export const HeadingOne = styled.p`
font-size: 14px;
color: black;
margin: 0 0 12px 0;
font-family: 'Inter', sans-serif;
`;

export const InputField = styled.input`
width: 100%;
outline: none;
border: none;
background-color: transparent;
`;

export const ArrowSignDiv = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
cursor: pointer;
`;

export const ArrowSign = styled.div`
background-image: url("https://anmfmt.web.app/static/media/pls.0e4ed426.svg");
background-repeat: no-repeat;
height: 16px;
width: 16px;
`;

export const SlipAndToleDiv = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
`;

export const SlippageDiv = styled.div`
font-size: 15px;
font-family: 'Inter', sans-serif;
`;

export const BusdAndBustDiv = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
`;

export const SwapButtonDiv = styled.div`
width: 100%;
display: flex;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;

`;

export const SwapButton = styled.button<any>`
width: 100%;
padding: 14px;
border-radius: 20px;
opacity: ${(props) => props.disabled ? '0.7' : '1'} ;
cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
box-shadow: none;
background-color:${theme.primaryColor};
border: none;
margin: 10px;
color: white;
transition: all 0.5s linear 0s;
:hover{
  opacity: 0.9;
  scale: 1.05;
  background-color: ${(props) => (props.disabled ? `${theme.red}` : `${theme.primaryColor}`)};
}
`;

export const PoolContainerMain = styled.div``;

export const FourButtonDiv = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
padding: 10px;
`;

export const PercentageButton = styled.div<any>`
margin: 5px;
padding: 5px 10px;
border: 1px solid rgb(238, 217, 204);
color: ${(props) => (props.percentage ? 'white' : "black")};;
background: ${(props) => (props.percentage ? `${theme.primaryColor}` : "transparent")};
border-radius: 10px;
cursor: pointer;
border: 1px solid ${theme.primaryColor};
:hover{
      background-color: ${theme.primaryColor};
      color: white;
      opacity: 0.8;
    }
`;

export const PoolTokenContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const PoolTokenHeading = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
color: ${theme.primaryColor};
margin: 12px 0;
`;

export const ValueAndToken = styled.div`
display: flex;
-webkit-box-pack: justify;
/* justify-content: space-between; */
-webkit-box-align: center;
align-items: center;
margin: 2px 0;
`;

export const Value = styled.span`
font-size: 16px;
font-family: 'Inter', sans-serif;
`;

export const Token = styled.span`
font-size: 16px;
font-family: 'Inter', sans-serif;
width: 30%;
line-height: 20px;
`;

export const PriceShare = styled.div`
  padding: 12px 16px 36px 16px;
  margin-top: 16px;
  background-color: ${theme.primaryColor};
  border-radius: 16px 16px 0 0;
  color: white;
  display: flex;
  justify-content: space-evenly;
`;

export const PriceShareBottom = styled.div`
  margin-top: -20px;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid ${theme.primaryColor};
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
  min-height: 44px;
`;

export const InitialValues = styled.div<any>`
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  line-height: 24px;
  button{
    font-size: 20px;
    border: none;
    margin: 0 12px;
    /* cursor: pointer; */
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    padding: 4px 12px;
    border-radius: 8px;
    :hover{
      background-color: ${theme.primaryColor};
      color: white;
      opacity: 0.5;
    }
  }
`;

export const OptionsDiv = styled.div<any>`
background-color: ${({active}) =>(active ? 'white' : 'transparent')};
padding: 6px 20px;
font-size: 12px;
font-family: 'Inter', sans-serif;
color: ${({active}) =>(active ? `${theme.primaryColor}` : 'white')};
border-radius: 120px;
cursor: pointer;
/* border: 1px solid ${({active}) =>(active ? '#10363d' : 'transparent')}; */
:hover{
      opacity: 0.8;
      /* border: 1px solid white; */
    }
`;
export const RangeSlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 12px; */
  flex-direction: column;
  h4{
    font-size: 24px;
    margin: 16px 0;
    color: ${theme.primaryColor};
  }
  .slider {
    -webkit-appearance: none;
    width: 75%;
  height: 5px;
  border-radius: 5px;
  background: #10363dCC;
  outline: none;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.primaryColor};
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.primaryColor};
  cursor: pointer;
}

.slider::-moz-range-progress {
  background-color: black; 
}
.slider::-moz-range-track {  
  background-color: red;
}
`;

export const Dropdown = styled.select`
  padding: 4px;
  font-size: 12px;
  height: 26px;
  border-radius: 6px;
  cursor: pointer;
  /* margin-bottom: 6px; */
`;