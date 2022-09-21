import styled from "styled-components";

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
margin: 40px 0px;
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
`;

export const AddHeading = styled.div<{ active: boolean }>`
background: ${(props) => (props.active ? `#10363d` : "transparent")};
color: ${(props) => (props.active ? 'white' : "black")};
box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
  rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
border-radius: 10px;
padding: 1rem;
margin: 0px 10px;
cursor: pointer;
border: 1px solid #10363d;
:hover{
  background: #10363dB3;
  color: white;
  /* opacity: 0.9; */
    }
`;

export const FormContainerMain = styled.div``;

export const FormInputOne = styled.div`
padding: 16px;
border-radius: 20px;
background-color: transparent;
margin: 10px;
border: 1px solid #10363d;
`;

export const FormInputOneHeading = styled.div`
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
`;

export const HeadingOne = styled.p`
font-size: 16px;
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
background-color:#10363d;
border: none;
margin: 10px;
color: white;
`;

export const PoolContainerMain = styled.div``;

export const FourButtonDiv = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
padding: 10px;
`;

export const PercentageButton = styled.div<{ percentage: boolean }>`
margin: 5px;
padding: 5px 10px;
border: 1px solid rgb(238, 217, 204);
color: ${(props) => (props.percentage ? 'white' : "black")};;
background: ${(props) => (props.percentage ? '#10363d' : "transparent")};
border-radius: 10px;
cursor: pointer;
border: 1px solid #10363d;
`;

export const PoolTokenContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const PoolTokenHeading = styled.div`
display: flex;
-webkit-box-pack: center;
justify-content: center;
color: rebeccapurple;
`;

export const ValueAndToken = styled.div`
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
align-items: center;
`;

export const Value = styled.span`
font-size: 16px;
font-family: 'Inter', sans-serif;
`;

export const Token = styled.span`
font-size: 16px;
font-family: 'Inter', sans-serif;
`;

export const PriceShare = styled.div`
  padding: 12px 16px 36px 16px;
  margin-top: 24px;
  background-color: #10363d;
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
  border: 1px solid #10363d;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
  min-height: 54px;
`;

export const InitialValues = styled.div`
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  line-height: 24px;
  button{
    font-size: 20px;
    border: none;
    margin: 0 12px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 8px;
    :hover{
      background-color: #10363d;
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
color: ${({active}) =>(active ? '#10363d' : 'white')};
border-radius: 120px;
cursor: pointer;
/* border: 1px solid ${({active}) =>(active ? '#10363d' : 'transparent')}; */
:hover{
      opacity: 0.8;
      /* border: 1px solid white; */
    }
`;