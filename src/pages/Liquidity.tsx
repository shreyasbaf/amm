import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { BustRouterAddress } from "../abi/bustRouterABI";
import { wbnbAddress } from "../abi/rest"; // BUSD
import { bustFactoryAddress } from "../abi/bust"; //BUST
import BigNumber from "bignumber.js";
import { ethToWei, weiToEth } from "../logic/Conversions";

import {
  AddHeading,
  ArrowSign,
  ArrowSignDiv,
  BusdAndBustDiv,
  FormContainerMain,
  FormInputOne,
  FormInputOneHeading,
  FourButtonDiv,
  HeadingButtonDiv,
  HeadingOne,
  InputField,
  LiquidityContainerMain,
  LiquidityInterDiv,
  LiquidityOuterDiv,
  PercentageButton,
  PoolContainerMain,
  PoolTokenContainer,
  PoolTokenHeading,
  SlipAndToleDiv,
  SlippageDiv,
  SwapButton,
  SwapButtonDiv,
  Token,
  Value,
  ValueAndToken,
} from "./LiquidityStyles";
import { Spinner } from "./Spinner";
const Liquidity = () => {
  const BUSTAddress = bustFactoryAddress;
  const BUSDAddress = wbnbAddress;
  const [active, setActive] = useState("Add");
  const [percentage, setPercentage] = useState(50);
  const [rest, setRest] = useState("");
  const [bust, setBust] = useState("");
  const [balancerest, setbalancerest] = useState("0.00");
  const [balancebust, setbalancebust] = useState("0.00");
  const [reserve0, setReserve0] = useState();
  const [reserve1, setReserve1] = useState();
  const [isApprovedBust, setIsApprovedBust] = useState(true);
  const [isApprovedRest, setIsApprovedRest] = useState(true);
  // const [amount1, setAmount1] = useState();
  const [bustlp, setBustlp] = useState<string|number>();
  const [bustR, setBustR] = useState<string>();
  const selector = useSelector((state: any) => state);
  const { RouterBust, REST, BUST, BustPair } = selector;
  const { address } = selector.wallet;
  const [initial, setInitial] = useState("")
  const [selectedLP, setSelectedLP] = useState<any>()
  const maxAllowance = new BigNumber(2).pow(256).minus(1)
  const [addLiquidityLoading, setAddLiquidityLoading] = useState(false)

  /** function to get balance of tokens */
  const getTokenBalance = async () => {
    try {
      const Rest = await REST.methods.balanceOf(address).call();
      setbalancerest(weiToEth(Rest, 18));
      const bust = await BUST.methods.balanceOf(address).call();
      setbalancebust(weiToEth(bust, 18));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenBalance();
  }, [REST,BUST, address, addLiquidityLoading]);

  /** useEffect to get Reserves */
  const getReserve = async () => {
    try {
      const res = await BustPair.methods.getReserves().call();
      setReserve0(res._reserve0);
      setReserve1(res._reserve1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReserve();
  }, [BustPair]);

  /**  function to get quote values */
  const getQuoteBusd = async (bust: any) => {
    try {
      if (bust === "") {
        setRest("");
      } else {
        const amountA = await RouterBust.methods
          .quote(ethToWei(bust, 18), reserve0, reserve1)
          .call();
        setRest(weiToEth(amountA, 18));
        // setRest(amountA);
        console.log("amountA", amountA);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**  function to get quote values */
  const getQuoteBust = async (rest: any) => {
    try {
      if (rest === "") {
        setBust("");
      } else {
        const amountB = await RouterBust.methods
          .quote(ethToWei(rest, 18), reserve1, reserve0)
          .call();
        setBust(weiToEth(amountB, 18));
        // setBust(amountB);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /** Check Allowences for both the tokens */
  const getAllowances = async (rest:any = '', bust:any = '') => {
  try{
    const allowanceA= await REST.methods.allowance(address,BustRouterAddress).call()
    const allowanceB = await BUST.methods.allowance(address,BustRouterAddress).call()
    if(rest !== ''){
      if (parseFloat(weiToEth(allowanceA, 18)) > parseFloat(rest)){
        setIsApprovedRest(true)
      } else{
        setIsApprovedRest(false)
      }
    }
    if(bust !== ''){
      if(parseFloat(weiToEth(allowanceB, 18)) > parseFloat(bust)){
        setIsApprovedBust(true)
      } else{
        setIsApprovedBust(false)
      }
    }
  } catch(err){
    console.log(err);
  }
}
  useEffect(() => {
    getAllowances(rest, bust);
  }, [rest, bust])

  /** Approve REST Token */
  const approveREST = async () => {
    try {
      const approvebusd = await REST.methods
        .approve(BustRouterAddress, maxAllowance)
        .send({ from: address })
        .on("transactionHash", function () {
          setIsApprovedRest(true);
        })
        .on("receipt", function () {
          setIsApprovedRest(true);
        })
        .on("confirmation", function () {
          setIsApprovedRest(true);
        })
        .on("error", function () {
          setIsApprovedRest(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  /** Approve BUST Token */
  const approveBUST = async () => {
    try {
      const approvebust = await BUST.methods
        .approve(BustRouterAddress, maxAllowance)
        .send({ from: address })
        .on("transactionHash", function () {
          setIsApprovedBust(true);
        })
        .on("receipt", function () {
          setIsApprovedBust(true);
        })
        .on("confirmation", function () {
          setIsApprovedBust(true);
        })
        .on("error", function () {
          setIsApprovedBust(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  /** function to convert min values of */
  const convertToMin = (number:any) =>{
    const convert = ((parseFloat(number) * 0.5 ) / 100 ).toFixed(5)
    const convertToWei = ethToWei(convert, 18)
    return convertToWei
  }

  /** AddLiquidity Function */
  const addLiquidity = async () => {
    setAddLiquidityLoading(true)
    const aMin = convertToMin(rest)
    const bMin = convertToMin(bust)
    try {
      const add = await RouterBust.methods
        .addLiquidity(
          BUSDAddress,
          BUSTAddress,
          ethToWei(rest, 18),
          ethToWei(bust, 18),
          aMin,
          bMin,
          address,
          Date.now() + 900
        )
        .send({ from: address })
        .on("receipt", function () {
          setAddLiquidityLoading(false)
          setBust('')
          setRest('')
        })
        .on("confirmation", function () {
          setAddLiquidityLoading(false)
          setBust('')
          setRest('')
        })
        .on("error", function () {
          setAddLiquidityLoading(false)
          console.log('error adding liquidity');
        });
    } catch (err) {
      console.log(err);
    }
  };

  /** useEffect to get BustLP */
  useEffect(() => {
    const getBUSTLP = async () => {
      try {
        const BUSTLP = await BustPair.methods.balanceOf(address).call();
        setBustlp(weiToEth(BUSTLP, 18));
      } catch (err) {
        console.log(err);
      }
    };
    getBUSTLP();
  }, [BustPair, address]);

  /** useEffect to get BUST */
  useEffect(() => {
    const getBUST = async () => {
      try {
        const BUSTR = await BUST.methods.balanceOf(address).call();
        setBustR(weiToEth(BUSTR,18));
      } catch (err) {
        console.log(err);
      }
    };
    getBUST();
  }, [BUST, address]);

  /** useEffect to get selectedLP Token */
  useEffect(() => {
    if(percentage === 100){
      setSelectedLP(bustlp)
    } else{
      setSelectedLP(Number(bustlp) * (percentage/100))
    }
  }, [percentage, selectedLP])
  return (
    <>
      <Navbar />
      <LiquidityContainerMain>
        <LiquidityOuterDiv>
          <LiquidityInterDiv>
            <HeadingButtonDiv>
              <AddHeading
                onClick={() => setActive("Add")}
                active={active === "Add"}
              >
                Add Liquidity
              </AddHeading>
              <AddHeading
                onClick={() => setActive("remove")}
                active={active === "remove"}
              >
                Remove Liquidity
              </AddHeading>
            </HeadingButtonDiv>

            {active === "Add" && (
              <FormContainerMain>
                <FormInputOne>
                  <FormInputOneHeading>
                    <HeadingOne>REST</HeadingOne>
                    <HeadingOne>Balance: {balancerest}</HeadingOne>
                  </FormInputOneHeading>
                  <InputField
                    placeholder="0.00"
                    value={rest ? rest : ""}
                    onChange={(e) => {
                      setRest(e.target.value);
                      getQuoteBust(e.target.value);
                    }}
                  ></InputField>
                </FormInputOne>
                <ArrowSignDiv>
                  <ArrowSign></ArrowSign>
                </ArrowSignDiv>
                <FormInputOne>
                  <FormInputOneHeading>
                    <HeadingOne>BUST</HeadingOne>
                    <HeadingOne>Balance: {balancebust}</HeadingOne>
                  </FormInputOneHeading>
                  <InputField
                    placeholder="0.00"
                    value={bust ? bust : ""}
                    onChange={(e) => {
                      setBust(e.target.value);
                      getQuoteBusd(e.target.value);
                    }}
                  ></InputField>
                </FormInputOne>
                <SlipAndToleDiv>
                  <SlippageDiv>Slippage tolerance: 0.5%</SlippageDiv>
                  <SlippageDiv>Transaction deadline: 15 min</SlippageDiv>
                </SlipAndToleDiv>
                <BusdAndBustDiv>
                  <SlippageDiv>1REST = 2.490698 BUST</SlippageDiv>
                  <SlippageDiv>1BUST = 0.401490 BUSD</SlippageDiv>
                </BusdAndBustDiv>
                <SwapButtonDiv>
                {!isApprovedRest && (
                    <SwapButton
                      onClick={() => approveREST()}
                      disabled={rest === ""}
                    >
                      Approve REST
                    </SwapButton>
                  )}
                  {!isApprovedBust && (
                    <SwapButton
                      onClick={() => approveBUST()}
                      disabled={bust === ""}
                    >
                      Approve BUST
                    </SwapButton>
                  )}
                  {isApprovedBust && isApprovedRest && (
                    <SwapButton onClick={() => addLiquidity()} disabled={(rest === "" && rest === "") && !addLiquidityLoading}>
                      {addLiquidityLoading ? <Spinner fontSize='14px'/> : 'Supply'}
                    </SwapButton>
                  )}
                </SwapButtonDiv>
              </FormContainerMain>
            )}

            {active === "remove" && (
              <>
                <PoolContainerMain>
                  <FourButtonDiv>
                    <PercentageButton
                      onClick={() => setPercentage(25)}
                      percentage={percentage === 25}
                    >
                      25%
                    </PercentageButton>
                    <PercentageButton
                      onClick={() => setPercentage(50)}
                      percentage={percentage === 50}
                    >
                      50%
                    </PercentageButton>
                    <PercentageButton
                      onClick={() => setPercentage(75)}
                      percentage={percentage === 75}
                    >
                      75%
                    </PercentageButton>
                    <PercentageButton
                      onClick={() => setPercentage(100)}
                      percentage={percentage === 100}
                    >
                      Max
                    </PercentageButton>
                  </FourButtonDiv>
                  <PoolTokenContainer>
                    <PoolTokenHeading>Pooled Tokens</PoolTokenHeading>
                    <ValueAndToken>
                      <Value>{bustlp}</Value>
                      <Token>BUST-LP</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>{balancerest}</Value>
                      <Token>REST</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>{balancebust}</Value>
                      <Token>BUST</Token>
                    </ValueAndToken>
                  </PoolTokenContainer>
                  <PoolTokenContainer>
                    <PoolTokenHeading>Selected Tokens</PoolTokenHeading>
                    <ValueAndToken>
                      <Value>{selectedLP || Number(bustlp) * (50/100) || 0.00} </Value>
                      <Token>BUST-LP</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>0.0000</Value>
                      <Token>REST</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>0.0000</Value>
                      <Token>BUST</Token>
                    </ValueAndToken>
                  </PoolTokenContainer>
                  <SlipAndToleDiv>
                    <SlippageDiv>Slippage tolerance: 0.5%</SlippageDiv>
                    <SlippageDiv>Transaction deadline: 15 min</SlippageDiv>
                  </SlipAndToleDiv>
                  <BusdAndBustDiv>
                    <SlippageDiv>1REST = 2.490698 BUST</SlippageDiv>
                    <SlippageDiv>1BUST = 0.401490 BUSD</SlippageDiv>
                  </BusdAndBustDiv>
                  <SwapButtonDiv>
                    <SwapButton>Remove</SwapButton>
                  </SwapButtonDiv>
                </PoolContainerMain>
              </>
            )}
          </LiquidityInterDiv>
        </LiquidityOuterDiv>
      </LiquidityContainerMain>
    </>
  );
};

export default Liquidity;
