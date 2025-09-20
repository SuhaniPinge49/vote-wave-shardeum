import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActivePolls from "@/components/ActivePolls";
import CreatePoll from "@/components/CreatePoll";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ActivePolls />
        <CreatePoll />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-card-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                  <div className="h-6 w-6 bg-primary-foreground rounded" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gradient">VoteWave</h3>
                  <p className="text-xs text-muted-foreground">Powered by Shardeum</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Decentralized voting made simple, secure, and affordable. 
                Building the future of democratic participation on blockchain.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#polls" className="hover:text-primary transition-colors">Active Polls</a></li>
                <li><a href="#create" className="hover:text-primary transition-colors">Create Poll</a></li>
                <li><a href="#results" className="hover:text-primary transition-colors">Results</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shardeum Network</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-card-border my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 VoteWave. Built on Shardeum Unstablenet.</p>
            <p>Ultra-fast • Ultra-cheap • Ultra-secure</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
