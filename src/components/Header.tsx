import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Vote, Menu, X } from "lucide-react";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const connectWallet = () => {
    // Mock wallet connection
    setIsConnected(!isConnected);
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
            <Button
              onClick={connectWallet}
              variant={isConnected ? "secondary" : "default"}
              className={isConnected ? "bg-success hover:bg-success/90" : "vote-button"}
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnected ? "Connected" : "Connect Wallet"}
            </Button>

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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;