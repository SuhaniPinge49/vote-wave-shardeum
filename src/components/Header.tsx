import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Vote, Menu, X, ExternalLink, Power } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Link } from "react-router-dom"; // 👈 add this

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { 
    isConnected, 
    account, 
    balance, 
    chainId, 
    isLoading, 
    connectWallet, 
    disconnectWallet,
    switchToShardeum,
    isMetaMaskInstalled 
  } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 8082:
        return "Shardeum Unstablenet";
      case 1:
        return "Ethereum";
      case 137:
        return "Polygon";
      default:
        return `Chain ${chainId}`;
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-card-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary glow-effect">
              <Vote className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">VoteWave</h1>
              <p className="text-xs text-muted-foreground">Powered by Shardeum</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#polls" className="text-foreground hover:text-primary transition-colors">
              Active Polls
            </a>
            <a href="#create" className="text-foreground hover:text-primary transition-colors">
              Create Poll
            </a>
            <Link to="/results" className="text-foreground hover:text-primary transition-colors">
              Results
            </Link> {/* 👈 changed to Link */}
          </nav>

          {/* Wallet Connection */}
          {/* ... (unchanged code) ... */}
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-card-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#polls"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Active Polls
              </a>
              <a
                href="#create"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Poll
              </a>
              <Link
                to="/results"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Results
              </Link> {/* 👈 changed to Link */}
              
              {/* Mobile Wallet Actions */}
              {/* ... (unchanged code) ... */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

