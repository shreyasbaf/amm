import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementDeadline, incrementDeadline } from "../logic/action/deadline.action";
import { decrementSlippage, incrementSlippage } from "../logic/action/slippage.action";
import {
  InitialValues,
  OptionsDiv,
  PriceShare,
  PriceShareBottom,
} from "./LiquidityStyles";

interface Props {
    bust: any;
    rest: any;
    slippage: any;
    deadline:any;
}

export const DetailsBlock = (props: Props) => {
  const [detailsType, setDetailsType] = useState("pool");
  const dispatch = useDispatch();
  const { bust , rest, slippage, deadline } = props; 
  return (
    <>
      <PriceShare>
        <OptionsDiv
          active={detailsType === "pool"}
          onClick={() => {
            setDetailsType("pool");
          }}
        >
          Pool Details
        </OptionsDiv>
        <OptionsDiv
          active={detailsType === "settings"}
          onClick={() => {
            setDetailsType("settings");
          }}
        >
          Settings
        </OptionsDiv>
      </PriceShare>
      <PriceShareBottom>
        {detailsType === "pool" ? (
          <>
            <InitialValues>
              {bust || "--"}
              <br /> BUST per REST
            </InitialValues>
            <InitialValues>
              {rest || "--"}
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
              <button onClick={() => dispatch(decrementSlippage())} disabled={ slippage <= 0.2 }>
                {" "}
                -{" "}
              </button>{" "}
              {slippage.toFixed(1)} %{" "}
              <button onClick={() => dispatch(incrementSlippage())} disabled={ slippage >= 2 } > + </button>
              <br /> Slippage tolerance{" "}
            </InitialValues>
            <InitialValues>
              {" "}
              <button onClick={() => dispatch(decrementDeadline())}>
                {" "}
                -{" "}
              </button>{" "}
              {deadline} mins{" "}
              <button onClick={() => dispatch(incrementDeadline())}> + </button>{" "}
              <br /> Transaction deadline
            </InitialValues>
          </>
        )}
      </PriceShareBottom>
    </>
  );
};
