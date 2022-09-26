import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux';

export const weiToEth = (amount: string, decimals: number = 18) => {
  return new BigNumber(amount).dividedBy(10 ** decimals).toFixed()
}

export const ethToWei = (amount: string, decimals: number = 18) => {
  return new BigNumber(amount).times(10 ** decimals).toFixed()
}

export const maxAllowance = new BigNumber(2).pow(128).minus(1);

/** function to convert min values of */
export const convertToMin = (number: any, slippage: any = 0.5 ) => {
    const convert = ((parseFloat(number) * slippage) / 100).toFixed(5);
    const convertToWei = ethToWei(convert, 18);
    return convertToWei;
};

/** function to convert min values of */
export const convertToMax = (number: any, slippage: any = 0.5) => {
    const convert = ((parseFloat(number) * slippage) * 100).toFixed(5);
    const convertToWei = ethToWei(convert, 18);
    return convertToWei;
};

export const getReserve = async (props:any) => {
  const { BustPair } = props;
  try {
    const res = await BustPair.methods.getReserves().call();
    return {res1: res._reserve0 , res2: res.reserve1} 
  } catch (err) {
    console.log(err);
  }
};