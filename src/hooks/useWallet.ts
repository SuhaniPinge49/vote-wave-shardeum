import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface WalletState {
  isConnected: boolean;
  account: string | null;
  balance: string | null;
  chainId: number | null;
  isLoading: boolean;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    account: null,
    balance: null,
    chainId: null,
    isLoading: false,
  });

  const { toast } = useToast();

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      // Open MetaMask installation page
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setWallet(prev => ({ ...prev, isLoading: true }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      // Get provider and network info
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      setWallet({
        isConnected: true,
        account: accounts[0],
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        isLoading: false,
      });

      toast({
        title: "Wallet Connected!",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });

      // Check if we're on Shardeum network (example chain ID)
      if (Number(network.chainId) !== 8082) {
        toast({
          title: "Network Notice",
          description: "Consider switching to Shardeum Unstablenet for optimal experience.",
        });
      }

    } catch (error: any) {
      console.error("Wallet connection error:", error);
      
      let errorMessage = "Failed to connect wallet";
      if (error.code === 4001) {
        errorMessage = "Connection rejected by user";
      } else if (error.code === -32002) {
        errorMessage = "Connection request already pending";
      }

      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setWallet(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      account: null,
      balance: null,
      chainId: null,
      isLoading: false,
    });

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Switch to Shardeum network
  const switchToShardeum = async () => {
    if (!isMetaMaskInstalled()) return;

    try {
      // Try to switch to Shardeum Unstablenet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1F8A" }], // 8082 in hex
      });
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1F8A",
                chainName: "Shardeum Unstablenet",
                rpcUrls: ["https://rpc.unstablenet.shardeum.org"],
                nativeCurrency: {
                  name: "Shardeum",
                  symbol: "SHM",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer.unstablenet.shardeum.org"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Shardeum network:", addError);
        }
      }
    }
  };

  // Listen for account and network changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== wallet.account) {
        // Account changed, reconnect
        connectWallet();
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWallet(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // Check if already connected
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          connectWallet();
        }
      })
      .catch(console.error);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    switchToShardeum,
    isMetaMaskInstalled: isMetaMaskInstalled(),
  };
};