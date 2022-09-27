import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  convertToMax,
  convertToMin,
  ethToWei,
  maxAllowance,
  weiToEth,
} from "../logic/Conversions";
import {
  ArrowSignDiv,
  Dropdown,
  FormContainerMain,
  FormInputOne,
  FormInputOneHeading,
  HeadingOne,
  InputField,
  SwapButtonDiv,
} from "./LiquidityStyles";
import { ArrowSign, SwapButton } from "./SwapStyles";
import { wbnbAddress } from "../abi/rest"; // BUSD
import { bustFactoryAddress } from "../abi/bust"; //BUST
import { BustRouterAddress } from "../abi/bustRouterABI";
import { Spinner } from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import { useBalance } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

const Swap = () => {
  const selector = useSelector((state: any) => state);
  const addRecentTransaction = useAddRecentTransaction()
  const { RouterBust, REST, BUST, slippage, deadline } = selector;
  const { address } = selector.wallet;
  const [rustBalance, setRustBalance] = useState("0.00");
  const [bustBalance, setBustBalance] = useState("0.00");
  const [swapLoading, setSwapLoading] = useState(false);
  const [amountA, setAmountA] = useState<any>();
  const [amountB, setAmountB] = useState<any>();
  const [type, setType] = useState(0);
  const [swapType, setSwapType] = useState(true);
  const RESTAddress = wbnbAddress;
  const BUSTAddress = bustFactoryAddress;
  const WBNBAddress = "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F";
  const RestToBust = [RESTAddress, BUSTAddress];
  const BustToRest = [BUSTAddress, RESTAddress];
  const RestToWBNB = [RESTAddress, WBNBAddress];
  const WBNBToRest = [WBNBAddress, RESTAddress];

  const [routerAddress, setRouterAddress] = useState<any>(RestToBust);
  const [isApprovedBust, setIsApprovedBust] = useState(false);
  const [isApprovedRest, setIsApprovedRest] = useState(false);
  const [tokenName, setTokenName] = useState("BUST");

  const successSwap = () => toast.success("Swap Successfull!");
  const failureSwap = () => toast.error("Error doing Swap!");
  const approveSuccess = () => toast.success("Token Approved!");
  const approveFailure = () => toast.error("Error approving token!");

  /** function to get balance of tokens */
  const getTokenBalance = async () => {
    if (address) {
      try {
        const Rest = await REST.methods.balanceOf(address).call();
        setRustBalance(weiToEth(Rest, 18));
        const bust = await BUST.methods.balanceOf(address).call();
        setBustBalance(weiToEth(bust, 18));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const balance: any = useBalance({
    addressOrName: address,
  });

  /** function to change the swap of tokens */
  const handleChangeRouter = () => {
    setAmountA("");
    setAmountB("");
    setIsApprovedRest(false);
    setSwapType(!swapType);
    if (!swapType) {
      setRouterAddress(RestToBust);
    } else {
      setRouterAddress(BustToRest);
    }
  };

  /** function to handle InputOne */
  const handleInputOne = async (input: any) => {
    if (input) {
      setAmountA(input);
      const result = await RouterBust.methods
        .getAmountsOut(
          ethToWei(input, 18),
          tokenName === "WBNB"
            ? swapType === true
              ? RestToWBNB
              : WBNBToRest
            : routerAddress
        )
        .call();
      setAmountB(weiToEth(result[1], 18));
      setType(1);
    } else {
      setAmountA("");
      setAmountB("");
    }
  };

  /** function to handle InputTwo */
  const handleInputTwo = async (input: any) => {
    if (input) {
      setAmountB(input);
      const result = await RouterBust.methods
        .getAmountsIn(
          ethToWei(input, 18),
          tokenName === "WBNB"
            ? swapType === true
              ? RestToWBNB
              : WBNBToRest
            : routerAddress
        )
        .call();
      setAmountA(weiToEth(result[0], 18));
      setType(2);
    } else {
      setAmountA("");
      setAmountB("");
    }
  };

  /** function to handle swapExactTokensForTokens */
  const swapExactTokensForTokens = async () => {
    setSwapLoading(true);
    try {
      const amountOutMin = convertToMin(amountB, slippage);
      const dl = Date.now() + deadline * 60;
      const ExactTokensForTokens = await RouterBust.methods
        .swapExactTokensForTokens(
          ethToWei(amountA),
          amountOutMin,
          routerAddress,
          address,
          dl
        )
        .send({ from: address })
        .on('transactionHash', function(hash:any){
          addRecentTransaction({
            hash: `${hash}`,
            description: 'Swap Tokens',
          });
      })
        .on("receipt", (receipt: any) => {
          successSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        })
        .on("error", (error: any, receipt: any) => {
          failureSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        });
    } catch (err) {
      setSwapLoading(false);
      console.log(err);
    }
  };

  /** function to handle swapTokensForExactTokens */
  const swapTokensForExactTokens = async () => {
    setSwapLoading(true);
    try {
      const amountInMax = convertToMax(amountA, slippage);
      const dl = Date.now() + deadline * 60;
      const ExactTokensForTokens = await RouterBust.methods
        .swapTokensForExactTokens(
          ethToWei(amountB),
          amountInMax,
          routerAddress,
          address,
          dl
        )
        .send({ from: address })
        .on('transactionHash', function(hash:any){
          addRecentTransaction({
            hash: `${hash}`,
            description: 'Swap Tokens',
          });
      })
        .on("receipt", (receipt: any) => {
          successSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        })
        .on("error", (error: any, receipt: any) => {
          failureSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        });
    } catch (err) {
      setSwapLoading(false);
      console.log(err);
    }
  };

  const swapExactTokensForETH = async () => {
    setSwapLoading(true);
    try {
      const amountOutMin = convertToMin(amountB, slippage);
      const dl = Date.now() + deadline * 60;
      const ExactTokensForTokens = await RouterBust.methods
        .swapExactTokensForETH(
          ethToWei(amountA),
          amountOutMin,
          RestToWBNB,
          address,
          dl
        )
        .send({ from: address })
        .on('transactionHash', function(hash:any){
          addRecentTransaction({
            hash: `${hash}`,
            description: 'Swap Native Tokens',
          });
      })
        .on("receipt", (receipt: any) => {
          successSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        })
        .on("error", (error: any, receipt: any) => {
          failureSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        });
    } catch (err) {
      setSwapLoading(false);
      console.log(err);
    }
  };

  const swapExactETHForTokens = async () => {
    setSwapLoading(true);
    try {
      const amountOutMin = convertToMin(amountB, slippage);
      const dl = Date.now() + deadline * 60;
      const ExactTokensForTokens = await RouterBust.methods
        .swapExactETHForTokens(amountOutMin, WBNBToRest, address, dl)
        .send({ from: address, value: ethToWei(amountA) })
        .on('transactionHash', function(hash:any){
          addRecentTransaction({
            hash: `${hash}`,
            description: 'Swap Native Tokens',
          });
      })
        .on("receipt", (receipt: any) => {
          successSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        })
        .on("error", (error: any, receipt: any) => {
          failureSwap();
          setSwapLoading(false);
          setAmountA("");
          setAmountB("");
        });
    } catch (err) {
      setSwapLoading(false);
      console.log(err);
    }
  };
  const handleSwap = () => {
    setSwapLoading(true);
    if (type === 1) {
      if (tokenName === "WBNB") {
        if (swapType === true) {
          swapExactTokensForETH();
        } else {
          swapExactETHForTokens();
        }
      } else {
        swapExactTokensForTokens();
      }
    } else {
      if (tokenName === "WBNB") {
        if (swapType === true) {
          swapExactTokensForETH();
        } else {
          swapExactETHForTokens();
        }
      } else {
        swapTokensForExactTokens();
      }
    }
    // setSwapLoading(false)
  };

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

  useEffect(() => {
    getTokenBalance();
  }, [REST, BUST, address, swapLoading]);

  /** Check Allowences for both the tokens */
  const getAllowances = async (rest: any = "", bust: any = "") => {
    if (address) {
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
    }
  };

  useEffect(() => {
    if (swapType === true) {
      getAllowances(amountA, amountB);
    } else {
      getAllowances(amountB, amountB);
    }
  }, [amountA, amountB]);

  const handleDropdownChange = (value: any) => {
    setTokenName(value);
    setAmountA("");
    setAmountB("");
    setIsApprovedRest(false);
  };

  return (
    <>
      <FormContainerMain>
        <FormInputOne>
          <FormInputOneHeading>
            {swapType && <HeadingOne>REST</HeadingOne>}
            {/* <HeadingOne>{swapType === true ? "REST" : "BUST"}</HeadingOne> */}
            {!swapType === true && (
              <Dropdown
                onChange={(e) => handleDropdownChange(e.target.value)}
                value={tokenName}
              >
                <option value="BUST">BUST</option>
                <option value="WBNB">WBNB</option>
              </Dropdown>
            )}
            <HeadingOne>
              Balance:
              {swapType === true
                ? parseFloat(rustBalance).toFixed(2)
                : tokenName === "WBNB"
                ? parseFloat(balance.data?.formatted).toFixed(4)
                : parseFloat(bustBalance).toFixed(2)}
            </HeadingOne>
          </FormInputOneHeading>
          <InputField
            placeholder="0.00"
            value={amountA}
            onChange={(e) => handleInputOne(e.target.value)}
          ></InputField>
        </FormInputOne>
        <ArrowSignDiv onClick={() => handleChangeRouter()}>
          <ArrowSign></ArrowSign>
        </ArrowSignDiv>
        <FormInputOne>
          <FormInputOneHeading>
            {!swapType && <HeadingOne>REST</HeadingOne>}
            {swapType === true && (
              <Dropdown
                onChange={(e) => handleDropdownChange(e.target.value)}
                value={tokenName}
              >
                <option value="BUST">BUST</option>
                <option value="WBNB">WBNB</option>
              </Dropdown>
            )}
            <HeadingOne>
              Balance:
              {swapType === true
                ? tokenName === "WBNB"
                  ? parseFloat(balance.data?.formatted).toFixed(4)
                  : parseFloat(bustBalance).toFixed(2)
                : parseFloat(rustBalance).toFixed(2)}
            </HeadingOne>
          </FormInputOneHeading>
          <InputField
            placeholder="0.00"
            value={amountB}
            onChange={(e) => handleInputTwo(e.target.value)}
          ></InputField>
        </FormInputOne>
        <SwapButtonDiv>
          {(!isApprovedRest || !isApprovedBust) && (
            <SwapButton
              onClick={() => {
                approveREST();
                approveBUST();
              }}
              disabled={amountA === ""}
            >
              Approve Tokens
            </SwapButton>
          )}
          <SwapButton
            disabled={amountB === '' && amountA === ''}
            onClick={() => handleSwap()}
          >
            {swapLoading ? <Spinner fontSize="14px" /> : "Swap Tokens"}
          </SwapButton>
        </SwapButtonDiv>
      </FormContainerMain>
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
    </>
  );
};

export default Swap;
