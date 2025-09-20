import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Vote, Menu, X, ExternalLink, Power } from "lucide-react";
import { useWallet } from "@/hooks/useWallet.ts";

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
    isMetaMaskInstalled,
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
            <a href="#results" className="text-foreground hover:text-primary transition-colors">
              Results
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <Button onClick={connectWallet} disabled={isLoading} className="vote-button">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Network Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    chainId === 8082
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-warning/20 text-warning border-warning/30"
                  }`}
                >
                  {chainId ? getNetworkName(chainId) : "Unknown"}
                </div>

                {/* Account Info */}
                <Button
                  variant="outline"
                  className="bg-card/20 backdrop-blur-sm border-card-border hover:bg-card/30"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <div className="text-left">
                      <div className="text-xs font-medium">
                        {account ? formatAddress(account) : ""}
                      </div>
                      {balance && (
                        <div className="text-xs text-muted-foreground">
                          {parseFloat(balance).toFixed(4)} SHM
                        </div>
                      )}
                    </div>
                  </div>
                </Button>

                {/* Network Switch & Disconnect */}
                <div className="hidden md:flex items-center space-x-1">
                  {chainId !== 8082 && (
                    <Button
                      onClick={switchToShardeum}
                      size="sm"
                      variant="outline"
                      className="bg-warning/10 border-warning/30 hover:bg-warning/20 text-warning"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Switch to Shardeum
                    </Button>
                  )}
                  <Button
                    onClick={disconnectWallet}
                    size="sm"
                    variant="outline"
                    className="bg-destructive/10 border-destructive/30 hover:bg-destructive/20 text-destructive"
                  >
                    <Power className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
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
              <a
                href="#results"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Results
              </a>

              {/* Mobile Wallet Actions */}
              {isConnected && (
                <>
                  <hr className="border-card-border" />
                  <div className="space-y-2">
                    {chainId !== 8082 && (
                      <Button
                        onClick={switchToShardeum}
                        size="sm"
                        variant="outline"
                        className="w-full bg-warning/10 border-warning/30 hover:bg-warning/20 text-warning"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" /> Switch to Shardeum
                      </Button>
                    )}
                    <Button
                      onClick={disconnectWallet}
                      size="sm"
                      variant="outline"
                      className="w-full bg-destructive/10 border-destructive/30 hover:bg-destructive/20 text-destructive"
                    >
                      <Power className="h-3 w-3 mr-2" /> Disconnect Wallet
                    </Button>
                  </div>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
