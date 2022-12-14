import { useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { BustRouterAddress, BustRouterABI } from "../abi/bustRouterABI";
import { BustPairAddress, BustPairABI } from "../abi/bustPairABI";
import { wbnbAddress, wbnbABI } from "../abi/rest";
import { bustFactoryAddress, bustFactoryABI } from "../abi/bust";
import { useDispatch, useSelector } from "react-redux";
import { setrouterabi } from "../logic/action/routerabi.action";
import { setBustPairabi } from "../logic/action/bustpairabi.action";
import { setwbnbabi } from "../logic/action/wbnbabi.action";
import { setBustFactoryabi } from "../logic/action/bustfactoryabi";
import {
  connectEthWallet,
  disconnectEthWallet,
} from "../logic/action/wallet.action";
import Logo from '../images/logo2.svg'
import { theme } from "../styles/theme";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { initialRust, initialTokenB } from "../logic/action/Initial.action";
declare let window: any;
   
const Navbar = () => {
  // const [address, setAddress] = useState<any>();
  const [openWalletList, setOpenWalletList] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect()
  const selector = useSelector((state: any) => state);
  const { BustPair } = selector;
  // const balance = useBalance({
  //   addressOrName: '0x92FcaD722206Ba07Fd4C002d81E409E3b1A77546',
  //   chainId: 97,
  // })
  const connectWallet = async () => {
    if (address) {
      const web3 = new Web3(window.ethereum);
      console.log(await web3.eth.getBalance(address), 'balof');
      setOpenWalletList(true);
      dispatch(connectEthWallet(address));
      const contract = new web3.eth.Contract(
        BustRouterABI,
        BustRouterAddress
      );
      const contract2 = new web3.eth.Contract(
        BustPairABI,
        BustPairAddress
      );
      const contract3 = new web3.eth.Contract(wbnbABI, wbnbAddress);
      const contract4 = new web3.eth.Contract(
        bustFactoryABI,
        bustFactoryAddress
      );
      dispatch(setrouterabi(contract));
      dispatch(setBustPairabi(contract2));
      dispatch(setwbnbabi(contract3));
      dispatch(setBustFactoryabi(contract4));
      setContract(contract);
    }
}
  useEffect(() => {
  connectWallet()
  // console.log(balance, 'balancdd');
  }, [address, isConnected]);

  useEffect(() => {
    const getWETH = async () => {
      if(contract){
      try {
        const weth = await contract.methods.WETH().call();
        console.log(weth);
      } catch (err) {
        console.log(err);
      }
    }
    };
    getWETH();
  }, [contract]);

  return (
    <>
      <NavbarContainerMain>
        <NavbarContainer>
          <NavbarInternal>
            <LogoDiv>
              <LogoImg></LogoImg>
              <LogoName>Sugarcakes</LogoName>
            </LogoDiv>
            <LinkDivMain>
            {/* <Link onClick={() => disconnect()}>
              Disconnect
              </Link> */}
              {/* <Link onClick={() => connectWallet()}>
                {address
                  ? //@ts-ignore
                    address?.slice(0, 3) +
                    "..." + //@ts-ignore
                    address?.substring(address.length - 5)
                  : "Connect Wallet"}
              </Link> */}
              {/* <h4>{balance}</h4> */}
              <ConnectButton />
            </LinkDivMain>
          </NavbarInternal>
        </NavbarContainer>
      </NavbarContainerMain>
    </>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  padding: 12px 24px;
  backdrop-filter: blur(8px);
  background: ${theme.primaryColor};
`;

const NavbarContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: calc(100% - 2 * var(--pageMargin));
  max-width: 1440px;
  margin: 0px auto;
  min-height: auto;
  padding: 0 0 24px 0px;
  transition: all 300ms ease-in-out 0s;
  position: sticky;
  top: 0px;
`;

const NavbarInternal = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-flow: row wrap;
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoImg = styled.div`
  background-image: url(${Logo});
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  margin-right: 16px;
`;

const LogoName = styled.div`
  height: inherit;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: white;
  font-weight: bolder;
  font-size: 32px;
`;

const LinkDivMain = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const Link = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 16px;
  font-size: 16px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  padding: 20px;
  margin: 0px 5px;
  border: 2px solid rgb(69, 87, 87);
  transition: all 0.5s linear 0s;
  :hover {
    color: rgb(255, 255, 255);
    opacity: 0.8;
    box-shadow: rgb(235, 218, 134) 5px 5px;
  }
`;