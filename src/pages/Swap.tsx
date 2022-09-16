import styled from "styled-components";
import {
  ArrowSignDiv,
  BusdAndBustDiv,
  FormContainerMain,
  FormInputOne,
  FormInputOneHeading,
  HeadingOne,
  InputField,
  SlipAndToleDiv,
  SlippageDiv,
  SwapButtonDiv,
} from "./LiquidityStyles";
import Navbar from "./Navbar";

const Swap = () => {
  return (
    <>
      <Navbar />
      <SwapContainerMain>
        <SwapOuterDiv>
          <SwapInterDiv>
            <SwapHeadingDiv>
              <SwapHeading>Swap</SwapHeading>
            </SwapHeadingDiv>
            <FormContainerMain>
              <FormInputOne>
                <FormInputOneHeading>
                  <HeadingOne>REST</HeadingOne>
                  <HeadingOne>Balance: 0.0000</HeadingOne>
                </FormInputOneHeading>
                <InputField placeholder="0.00"></InputField>
              </FormInputOne>
              <ArrowSignDiv>
                <ArrowSign></ArrowSign>
              </ArrowSignDiv>
              <FormInputOne>
                <FormInputOneHeading>
                  <HeadingOne>BUST</HeadingOne>
                  <HeadingOne>Balance: 0.0000</HeadingOne>
                </FormInputOneHeading>
                <InputField placeholder="0.00"></InputField>
              </FormInputOne>
              <SlipAndToleDiv>
                <SlippageDiv>Slippage tolerance: 0.5%</SlippageDiv>
                <SlippageDiv>Transaction deadline: 15 min</SlippageDiv>
              </SlipAndToleDiv>
              <BusdAndBustDiv>
                <SlippageDiv>1BUSD = 2.490698 BUST</SlippageDiv>
                <SlippageDiv>1BUST = 0.401490 BUSD</SlippageDiv>
              </BusdAndBustDiv>
              <SwapButtonDiv>
                <SwapButton>Swap</SwapButton>
              </SwapButtonDiv>
            </FormContainerMain>
          </SwapInterDiv>
        </SwapOuterDiv>
      </SwapContainerMain>
    </>
  );
};

export default Swap;

const SwapContainerMain = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`;

const SwapOuterDiv = styled.div`
  max-width: 420px;
  width: 100%;
  background: rgb(255, 253, 250);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 20px;
  padding: 1rem;
  margin: 40px 0px;
`;

const SwapInterDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwapHeadingDiv = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
`;

const SwapHeading = styled.div`
  /* background:#10363d; */
  color: #10363d;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 10px;
  padding: 1rem;
  margin: 0px 10px;
  cursor: pointer;
  /* border: 1px solid #10363d; */
`;

const ArrowSign = styled.div`
  background-image: url("https://anmfmt.web.app/static/media/arrow.167534cd.svg");
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
`;

const SwapButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: none;
  background-color: #10363d;
  border: none;
  margin: 10px;
  color: white;
`;
