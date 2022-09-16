import BigNumber from 'bignumber.js'

export const weiToEth = (amount: string, decimals: number) => {
  return new BigNumber(amount).dividedBy(10 ** decimals).toFixed()
}

export const ethToWei = (amount: string, decimals: number) => {
  return new BigNumber(amount).times(10 ** decimals).toFixed()
}

// export const MaxUint256: BigNumber = (/*#__PURE__*/BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
