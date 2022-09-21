import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  BusdAndBustDiv,
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
  PoolTokenContainer,
  PoolTokenHeading,
  PriceShare,
  PriceShareBottom,
  SlipAndToleDiv,
  SlippageDiv,
  SwapButton,
  SwapButtonDiv,
  Token,
  Value,
  ValueAndToken,
} from "./LiquidityStyles";
import {
  decrementSlippage,
  incrementSlippage,
} from "../logic/action/slippage.action";
import {
  decrementDeadline,
  incrementDeadline,
} from "../logic/action/deadline.action";

const Liquidity = () => {
  const BUSTAddress = bustFactoryAddress;
  const RESTAddress = wbnbAddress;
  const [active, setActive] = useState("Add");
  const [percentage, setPercentage] = useState(50);
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
  const { address } = selector.wallet;
  const [selectedLP, setSelectedLP] = useState<any>();
  const [addLiquidityLoading, setAddLiquidityLoading] = useState(false);
  const [isLiquidityAdded, setisLiquidityAdded] = useState(false);
  const [totalSupply, setTotalSupply] = useState<any>("");
  const success = () => toast.success("Liquidity Added Successfully!");
  const failure = () => toast.error("Error adding Liquidity!");
  const approveSuccess = () => toast.success("Token Approved!");
  const approveFailure = () => toast.error("Error approving token!");
  // const slippageVal = slippage
  const [tokenA, setTokenA] = useState<any>();
  const [tokenB, setTokenB] = useState<any>();
  const [selectedtokenA, setSelectedTokenA] = useState<any>();
  const [selectedtokenB, setSelectedTokenB] = useState<any>();
  const [detailsType, setDetailsType] = useState("pool");
  const [initlalREST, setInitlalREST] = useState("");
  const [initialBust, setInitialBust] = useState("");

  const dispatch = useDispatch();
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
    console.log("getInitial", initlalREST, initialBust);
  };

  useEffect(() => {
    getInitials();
  }, [rest, bust]);

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
  }, [REST, BUST, address, addLiquidityLoading]);

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
        .approve(BustRouterAddress, maxAllowance)
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
        .approve(BustRouterAddress, maxAllowance)
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
          Date.now() + 900
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

  /** useEffect to get BustLP */
  useEffect(() => {
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
    getBUSTLP();
  }, [BustPair, address]);

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
  }, [percentage, selectedLP]);

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

  const approvePair = async () => {
    try {
      const approve = await BustPair.methods
        .approve(BustRouterAddress, ethToWei(selectedLP))
        .send({ from: address })
        .on("receipt", function () {
          approveSuccess();
        })
        .on("error", function () {
          approveFailure();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeLiquidity = async () => {
    try {
      await approvePair();
      const remove = await RouterBust.methods
        .removeLiquidity(
          RESTAddress,
          BUSTAddress,
          ethToWei(selectedLP),
          convertToMin(selectedtokenA, slippage),
          convertToMin(selectedtokenB, slippage),
          address,
          Date.now() + 900
        )
        .send({ from: address })
        .on("receipt", function () {
          approveSuccess();
        })
        .on("error", function () {
          approveFailure();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalSupply();
  }, [tokenB, tokenA]);

  return (
    <>
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
            </HeadingButtonDiv>

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
                      <Value>{parseFloat(bustlp).toFixed(4)}</Value>
                      <Token>BUST-LP</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>{parseFloat(tokenA).toFixed(4)}</Value>
                      <Token>REST</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>{parseFloat(tokenB).toFixed(4)}</Value>
                      <Token>BUST</Token>
                    </ValueAndToken>
                  </PoolTokenContainer>
                  <PoolTokenContainer>
                    <PoolTokenHeading>Selected Tokens</PoolTokenHeading>
                    <ValueAndToken>
                      <Value>
                        {(selectedLP && parseFloat(selectedLP).toFixed(4)) ||
                          Number(bustlp) * (50 / 100) ||
                          0.0}
                      </Value>
                      <Token>BUST-LP</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>
                        {(selectedtokenA &&
                          parseFloat(selectedtokenA).toFixed(4)) ||
                          Number(tokenA) * (50 / 100) ||
                          0.0}
                      </Value>
                      <Token>REST</Token>
                    </ValueAndToken>
                    <ValueAndToken>
                      <Value>
                        {(selectedtokenB &&
                          parseFloat(selectedtokenB).toFixed(4)) ||
                          Number(tokenB) * (50 / 100) ||
                          0.0}
                      </Value>
                      <Token>BUST</Token>
                    </ValueAndToken>
                  </PoolTokenContainer>
                </PoolContainerMain>
              </>
            )}
            <PriceShare>
              <OptionsDiv
                active={detailsType === "pool"}
                onClick={() => {
                  setDetailsType("pool");
                  getInitials();
                }}
              >
                Pool Details
              </OptionsDiv>
              <OptionsDiv
                active={detailsType === "settings"}
                onClick={() => {
                  setDetailsType("settings");
                  getInitials();
                }}
              >
                Settings
              </OptionsDiv>
            </PriceShare>
            <PriceShareBottom>
              {detailsType === "pool" ? (
                <>
                  <InitialValues>
                    {initialBust || "--"}
                    <br /> BUST per REST
                  </InitialValues>
                  <InitialValues>
                    {initlalREST || "--"}
                    <br /> REST per BUST
                  </InitialValues>
                  <InitialValues>
                    {" "}
                    -- <br /> Share of Pool
                  </InitialValues>
                </>
              ) : (
                <>
                  <InitialValues>
                    {" "}
                    <button onClick={() => dispatch(decrementSlippage())}>
                      {" "}
                      -{" "}
                    </button>{" "}
                    {slippage} %{" "}
                    <button onClick={() => dispatch(incrementSlippage())}>
                      {" "}
                      +{" "}
                    </button>
                    <br /> Slippage tolerance{" "}
                  </InitialValues>
                  <InitialValues>
                    {" "}
                    <button onClick={() => dispatch(decrementDeadline())}>
                      {" "}
                      -{" "}
                    </button>{" "}
                    {deadline} mins{" "}
                    <button onClick={() => dispatch(incrementDeadline())}>
                      {" "}
                      +{" "}
                    </button>{" "}
                    <br /> Transaction deadline
                  </InitialValues>
                </>
              )}
            </PriceShareBottom>
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
                        rest === "" && rest === "" && !addLiquidityLoading
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
              <SwapButtonDiv>
                <SwapButton onClick={() => removeLiquidity()}>
                  Remove
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
    </>
  );
};

export default Liquidity;
