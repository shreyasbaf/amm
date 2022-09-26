import './App.css';
import Liquidity from './pages/Liquidity';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';

import '@rainbow-me/rainbowkit/styles.css';
import {
  AvatarComponent,
  Chain,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { theme } from './styles/theme';

function App() {
  const bsc: Chain = {
    id: 97,
    name: 'Binance',
    network: 'binance',
    iconUrl: 'https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'TBNB',
      symbol: 'TBNB',
    },
    rpcUrls: {
      default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
      etherscan: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
    },
    testnet: false,
  };
  const { chains, provider } = configureChains(
    [bsc],
    [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  // const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  //   return null
  // };
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider modalSize="compact"  showRecentTransactions={true}     
    theme={midnightTheme({
      accentColor: `${theme.primaryColor}`,
      accentColorForeground: 'white',
      borderRadius: 'medium',
      fontStack: 'system',
      overlayBlur: 'large',
    })} chains={chains}>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Liquidity />}/>
    </Routes>
    </BrowserRouter>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
