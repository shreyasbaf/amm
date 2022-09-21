import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux';

export const weiToEth = (amount: string, decimals: number = 18) => {
  return new BigNumber(amount).dividedBy(10 ** decimals).toFixed()
}

export const ethToWei = (amount: string, decimals: number = 18) => {
  return new BigNumber(amount).times(10 ** decimals).toFixed()
}

export const maxAllowance = new BigNumber(2).pow(256).minus(1);

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