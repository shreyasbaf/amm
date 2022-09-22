import { useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { BustRouterAddress, BustRouterABI } from "../abi/bustRouterABI";
import { BustPairAddress, BustPairABI } from "../abi/bustPairABI";
import { wbnbAddress, wbnbABI } from "../abi/rest";
import { bustFactoryAddress, bustFactoryABI } from "../abi/bust";
import { useDispatch } from "react-redux";
import { setrouterabi } from "../logic/action/routerabi.action";
import { setBustPairabi } from "../logic/action/bustpairabi.action";
import { setwbnbabi } from "../logic/action/wbnbabi.action";
import { setBustFactoryabi } from "../logic/action/bustfactoryabi";
import {
  connectEthWallet,
  disconnectEthWallet,
} from "../logic/action/wallet.action";

import Logo from '../images/logo2.svg'
declare let window: any;

const Navbar = () => {
  const [address, setAddress] = useState();
  const [openWalletList, setOpenWalletList] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const dispatch = useDispatch();

  const connectWallet = () => {
  try {
    if (openWalletList === false) {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts: any) => {
            console.log(accounts);
            setAddress(accounts[0]);
            const add = accounts[0];
            const web3 = new Web3(window.ethereum);
            if (add) {
              setOpenWalletList(true);
              dispatch(connectEthWallet(add));
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
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  } catch (err) {
    dispatch(disconnectEthWallet());
    setOpenWalletList(false);
    console.log(err);
  }
}
  useEffect(() => {
  connectWallet()
  }, []);

  useEffect(() => {
    const getWETH = async () => {
      try {
        const weth = await contract.methods.WETH().call();
        console.log(weth);
      } catch (err) {
        console.log(err);
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
              <Link onClick={() => connectWallet()}>
                {address
                  ? //@ts-ignore
                    address?.slice(0, 3) +
                    "..." + //@ts-ignore
                    address?.substring(address.length - 5)
                  : "Connect Wallet"}
              </Link>
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
  background: #10363d;
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