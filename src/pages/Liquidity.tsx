import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BustRouterAddress } from "../abi/bustRouterABI";
import { wbnbAddress } from "../abi/rest"; // REST
import { bustFactoryAddress } from "../abi/bust"; //BUST
import {
  convertToMin,
  ethToWei,
  maxAllowance,
  weiToEth,
} from "../logic/Conversions";
import { Spinner } from "./Spinner";
import { ToastContainer, toast } from "react-toastify";

import {
  AddHeading,
  ArrowSign,
  ArrowSignDiv,
  FormContainerMain,
  FormInputOne,
  FormInputOneHeading,
  FourButtonDiv,
  HeadingButtonDiv,
  HeadingOne,
  InitialValues,
  InputField,
  LiquidityContainerMain,
  LiquidityInterDiv,
  LiquidityOuterDiv,
  OptionsDiv,
  PercentageButton,
  PoolContainerMain,
  PriceShare,
  PriceShareBottom,
  RangeSlider,
  SwapButton,
  SwapButtonDiv,
} from "./LiquidityStyles";
import { DetailsBlock } from "./DetailsBlock";
import Swap from "./Swap";
import { useAccount } from "wagmi";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";

const Liquidity = () => {
  const { isConnected, address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();
  const BUSTAddress = bustFactoryAddress;
  const RESTAddress = wbnbAddress;
  const [active, setActive] = useState("Add");
  const [percentage, setPercentage] = useState<any>(50);
  const [rest, setRest] = useState("");
  const [bust, setBust] = useState("");
  const [balancerest, setbalancerest] = useState("0.00");
  const [balancebust, setbalancebust] = useState("0.00");
  const [reserve0, setReserve0] = useState<any>();
  const [reserve1, setReserve1] = useState<any>();
  const [isApprovedBust, setIsApprovedBust] = useState(true);
  const [isApprovedRest, setIsApprovedRest] = useState(true);
  // const [amount1, setAmount1] = useState();
  const [bustlp, setBustlp] = useState<any>();
  const [bustR, setBustR] = useState<string>();
  const selector = useSelector((state: any) => state);
  const { RouterBust, REST, BUST, BustPair, slippage, deadline } = selector;
  // const { address } = selector.wallet;
  const [selectedLP, setSelectedLP] = useState<any>();
  const [addLiquidityLoading, setAddLiquidityLoading] = useState(false);
  const [isLiquidityAdded, setisLiquidityAdded] = useState(false);
  const [totalSupply, setTotalSupply] = useState<any>("");
  // const slippageVal = slippage
  const [tokenA, setTokenA] = useState<any>();
  const [tokenB, setTokenB] = useState<any>();
  const [selectedtokenA, setSelectedTokenA] = useState<any>();
  const [selectedtokenB, setSelectedTokenB] = useState<any>();
  const [initlalREST, setInitlalREST] = useState("");
  const [initialBust, setInitialBust] = useState("");

  const [isRemoveAllowed, setIsRemoveAllowed] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [isRemoveLiquidityLoading, setIsRemoveLiquidityLoading] = useState(false);

  const success = () => toast.success("Liquidity Added Successfully!");
  const failure = () => toast.error("Error adding Liquidity!");
  const approveSuccess = () => toast.success("Token Approved!");
  const approveFailure = () => toast.error("Error approving token!");
  const removeSuccess = () => toast.success("Liquidity removed Successfully!!");
  const removeFailure = () => toast.error("Error removing Liquidity!");
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
  }, [BustPair, address]);

  const getInitials = async () => {
    try {
      getReserve();
      let init = "1";
      if (reserve0 && reserve1) {
        const amountA = await RouterBust.methods
          .quote(ethToWei(init), reserve0, reserve1)
          .call();
        const floatA = parseFloat(weiToEth(amountA));
        setInitlalREST(floatA.toFixed(2));
        const amountB = await RouterBust.methods
          .quote(ethToWei(init), reserve1, reserve0)
          .call();
        const floatB = parseFloat(weiToEth(amountB));
        setInitialBust(floatB.toFixed(2));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitials();
  }, [RouterBust, reserve1, reserve0, address]);

  /** function to get balance of tokens */
  const getTokenBalance = async () => {
    try {
      const rest = await REST.methods.balanceOf(address).call();
      setbalancerest(weiToEth(rest));
      const bust = await BUST.methods.balanceOf(address).call();
      setbalancebust(weiToEth(bust));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenBalance();
  }, [REST, BUST, address, addLiquidityLoading, isRemoveLiquidityLoading, address]);

  /**  function to get quote values */
  const getQuoteBusd = async (bust: any) => {
    try {
      if (bust === "") {
        setRest("");
      } else {
        const amountA = await RouterBust.methods
          .quote(ethToWei(bust), reserve0, reserve1)
          .call();
        setRest(weiToEth(amountA));
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
          .quote(ethToWei(rest), reserve1, reserve0)
          .call();
        setBust(weiToEth(amountB));
        // setBust(amountB);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /** Check Allowences for both the tokens */
  const getAllowances = async (rest: any = "", bust: any = "") => {
    try {
      const allowanceA = await REST.methods
        .allowance(address, BustRouterAddress)
        .call();
      const allowanceB = await BUST.methods
        .allowance(address, BustRouterAddress)
        .call();
      if (rest !== "") {
        if (parseFloat(weiToEth(allowanceA, 18)) > parseFloat(rest)) {
          setIsApprovedRest(true);
        } else {
          setIsApprovedRest(false);
        }
      }
      if (bust !== "") {
        if (parseFloat(weiToEth(allowanceB, 18)) > parseFloat(bust)) {
          setIsApprovedBust(true);
        } else {
          setIsApprovedBust(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllowances(rest, bust);
  }, [rest, bust]);

  /** Approve REST Token */
  const approveREST = async () => {
    try {
      const approvebusd = await REST.methods
        .approve(BustRouterAddress, ethToWei(maxAllowance.toString()))
        .send({ from: address })
        .on("receipt", function () {
          approveSuccess();
          setIsApprovedRest(true);
        })
        .on("error", function () {
          approveFailure();
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
        .approve(BustRouterAddress, ethToWei(maxAllowance.toString()))
        .send({ from: address })
        .on("receipt", function () {
          approveSuccess();
          setIsApprovedBust(true);
        })
        .on("error", function () {
          approveFailure();
          setIsApprovedBust(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  /** AddLiquidity Function */
  const addLiquidity = async () => {
    setAddLiquidityLoading(true);
    const aMin = convertToMin(rest, slippage);
    const bMin = convertToMin(bust, slippage);
    try {
      const add = await RouterBust.methods
        .addLiquidity(
          RESTAddress,
          BUSTAddress,
          ethToWei(rest, 18),
          ethToWei(bust, 18),
          aMin,
          bMin,
          address,
          Date.now() + (deadline * 60)
        )
        .send({ from: address })
        .on("receipt", function () {
          success();
          setAddLiquidityLoading(false);
          setBust("");
          setRest("");
        })
        .on("error", function () {
          failure();
          setAddLiquidityLoading(false);
          console.log("error adding liquidity");
        });
    } catch (err) {
      console.log(err);
    }
  };

  /**REMOVE LIQUIDITY */

  /** useEffect to get Pair Tokens */
  const getBUSTLP = async () => {
    try {
      const BUSTLP = await BustPair.methods.balanceOf(address).call();
      setBustlp(weiToEth(BUSTLP, 18));
      if (BUSTLP > 0) {
        setisLiquidityAdded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBUSTLP();
  }, [BustPair, address, isRemoveLiquidityLoading, addLiquidityLoading]);

    /** useEffect to get selected Token values */
    useEffect(() => {
      if (percentage === 100) {
        setSelectedLP(bustlp);
        setSelectedTokenA(tokenA);
        setSelectedTokenB(tokenB);
      } else {
        setSelectedLP(Number(bustlp) * (percentage / 100));
        setSelectedTokenB(Number(tokenB) * (percentage / 100));
        setSelectedTokenA(Number(tokenA) * (percentage / 100));
      }
      removeAllowance();
    }, [percentage, selectedLP, tokenB, tokenA, isRemoveLiquidityLoading, addLiquidityLoading]);

  const removeAllowance = async () => {
    try {
      const allowance = await BustPair.methods
        .allowance(address, BustRouterAddress)
        .call();
      if (parseFloat(weiToEth(allowance)) >= parseFloat(selectedLP)) {
        setIsRemoveAllowed(true);
      } else {
        setIsRemoveAllowed(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**function to get totalSupply */
  const getTotalSupply = async () => {
    try {
      const total = await BustPair.methods.totalSupply().call();
      const totalFloat = parseFloat(weiToEth(total));
      setTotalSupply(totalFloat);
      // const liquidity = ethToWei(bustlp)
      const BUST =
        (parseFloat(weiToEth(reserve0)) * parseFloat(bustlp)) / totalSupply;
      const REST =
        (parseFloat(weiToEth(reserve1)) * parseFloat(bustlp)) / totalSupply;
      setTokenA(REST);
      setTokenB(BUST);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTotalSupply();
  }, [tokenB, tokenA, isRemoveLiquidityLoading]);

  const approvePair = async () => {
    try {
      if (selectedLP) {
        setApproveLoading(true);
        const approve = await BustPair.methods
          .approve(BustRouterAddress, ethToWei(selectedLP))
          .send({ from: address })
          .on('transactionHash', function(hash:any){
            addRecentTransaction({
              hash: `${hash}`,
              description: 'Pair Approved',
            });
        })
          .on("receipt", function () {
            approveSuccess();
            removeAllowance();
            setApproveLoading(false);
          })
          .on("error", function () {
            approveFailure();
            removeAllowance();
            setApproveLoading(false);
          });
        setApproveLoading(false);
      }
    } catch (error) {
      console.log(error);
      setApproveLoading(false);
    }
  };

  const removeLiquidity = async () => {
    try {
      setIsRemoveLiquidityLoading(true)
      // await approvePair();
      if (selectedLP && selectedtokenA && selectedtokenB) {
        const remove = await RouterBust.methods
          .removeLiquidity(
            RESTAddress,
            BUSTAddress,
            ethToWei(selectedLP),
            convertToMin(selectedtokenA, slippage),
            convertToMin(selectedtokenB, slippage),
            address,
            Date.now() + (deadline * 60)
          )
          .send({ from: address })
          .on("receipt", function () {
            removeSuccess();
            setPercentage(50);
            setIsRemoveLiquidityLoading(false)
          })
          .on("error", function () {
            removeFailure();
            setIsRemoveLiquidityLoading(false)
          });
      }
      setIsRemoveLiquidityLoading(false)
    } catch (error) {
      console.log(error);
      setIsRemoveLiquidityLoading(false)
    }
  };
  return (
    <>
        {isConnected ? 
        <>
            <HeadingButtonDiv>
              <AddHeading
                onClick={() => setActive("Add")}
                active={active === "Add"}
              >
                Add Liquidity
              </AddHeading>
              {isLiquidityAdded && (
                <AddHeading
                  onClick={() => {
                    setActive("remove");
                    getTotalSupply();
                    getInitials();
                  }}
                  active={active === "remove"}
                >
                  Remove Liquidity
                </AddHeading>
              )}
              <AddHeading
                  onClick={() => {
                    setActive("Swap");
                    getTotalSupply();
                    getInitials();
                  }}
                  active={active === "Swap"}
                >
                  Swap
                </AddHeading>
            </HeadingButtonDiv>
      <LiquidityContainerMain>
        <LiquidityOuterDiv>
          <LiquidityInterDiv>
            {active === "Swap" && <Swap initialBUST={initialBust} initialRUST={initlalREST} />}
            {active === "Add" && (
              <FormContainerMain>
                <FormInputOne>
                  <FormInputOneHeading>
                    <HeadingOne>REST</HeadingOne>
                    <HeadingOne>
                      Balance: {parseFloat(balancerest).toFixed(2)}
                    </HeadingOne>
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
                    <HeadingOne>
                      Balance: {parseFloat(balancebust).toFixed(2)}
                    </HeadingOne>
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
                <DetailsBlock
                  bust={initialBust}
                  rest={initlalREST}
                  slippage={slippage}
                  deadline={deadline}
                />
              </FormContainerMain>
            )}
            {active === "remove" && (
              <>
                <PoolContainerMain>
                  <RangeSlider>
                    <h4>{percentage} %</h4>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={percentage}
                      className="slider"
                      id="myRange"
                      onChange={(e) => setPercentage(e.target.value)}
                    />
                  </RangeSlider>
                  <FourButtonDiv>
                    <PercentageButton onClick={() => setPercentage(25)}>
                      25%
                    </PercentageButton>
                    <PercentageButton onClick={() => setPercentage(50)}>
                      50%
                    </PercentageButton>
                    <PercentageButton onClick={() => setPercentage(75)}>
                      75%
                    </PercentageButton>
                    <PercentageButton onClick={() => setPercentage(100)}>
                      Max
                    </PercentageButton>
                  </FourButtonDiv>
                  <PriceShare>
                    <OptionsDiv>Pooled Tokens</OptionsDiv>
                  </PriceShare>
                  <PriceShareBottom>
                    <InitialValues>
                      {parseFloat(bustlp).toFixed(4)}
                      <br /> Pool Tokens
                    </InitialValues>
                    <InitialValues>
                      {parseFloat(tokenA).toFixed(4)}
                      <br /> Pool REST
                    </InitialValues>
                    <InitialValues>
                      {parseFloat(tokenB).toFixed(4)}
                      <br /> Pool BUST
                    </InitialValues>
                  </PriceShareBottom>

                  <PriceShare>
                    <OptionsDiv>Selected Tokens</OptionsDiv>
                  </PriceShare>
                  <PriceShareBottom>
                    <InitialValues>
                      {(selectedLP && parseFloat(selectedLP).toFixed(4)) ||
                        Number(bustlp) * (50 / 100) ||
                        0.0}{" "}
                      <br /> Pool Tokens
                    </InitialValues>
                    <InitialValues>
                      {(selectedtokenA &&
                        parseFloat(selectedtokenA).toFixed(4)) ||
                        Number(tokenA) * (50 / 100) ||
                        0.0}{" "}
                      <br /> Pool REST
                    </InitialValues>
                    <InitialValues>
                      {(selectedtokenB &&
                        parseFloat(selectedtokenB).toFixed(4)) ||
                        Number(tokenB) * (50 / 100) ||
                        0.0}{" "}
                      <br /> Pool BUST
                    </InitialValues>
                  </PriceShareBottom>
                </PoolContainerMain>
              </>
            )}
            {active === "Add" ? (
              <>
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
                    <SwapButton
                      onClick={() => addLiquidity()}
                      disabled={
                        rest === "" ||
                        bust === "" ||
                        !(parseFloat(balancerest) > parseFloat(rest)) ||
                        !(parseFloat(balancebust) > parseFloat(bust))
                      }
                    >
                      {addLiquidityLoading ? (
                        <Spinner fontSize="14px" />
                      ) : (
                        "Supply"
                      )}
                    </SwapButton>
                  )}
                </SwapButtonDiv>
              </>
            ) : (
              active === "remove" &&
              <SwapButtonDiv>
                {!isRemoveAllowed ? (
                  <SwapButton
                    disabled={isRemoveAllowed}
                    onClick={() => approvePair()}
                  >
                    {!approveLoading ? "Approve" : <Spinner fontSize="14px" />}
                  </SwapButton>
                ) : (
                  <SwapButton style={{ background: "#29AB87" }}>
                    Approved
                  </SwapButton>
                )}
                <SwapButton
                  disabled={!isRemoveAllowed}
                  onClick={() => removeLiquidity()}
                >
                {isRemoveLiquidityLoading ? <Spinner fontSize='14px'/> :   'Remove'}
                </SwapButton>
              </SwapButtonDiv>
            )}
          </LiquidityInterDiv>
        </LiquidityOuterDiv>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </LiquidityContainerMain> 
    </> : <HeadingButtonDiv>
    <ConnectButton /> 
    </HeadingButtonDiv>}
    </>
  );
};

export default Liquidity;
