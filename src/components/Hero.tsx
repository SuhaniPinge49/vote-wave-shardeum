import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-voting.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm border border-card-border mb-8">
            <span className="text-sm font-medium text-primary-foreground">
              Powered by Shardeum Unstablenet
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Decentralized Voting
            <br />
            <span className="text-gradient">Made Simple</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Create tamper-proof polls and conduct transparent voting for your community.
            Lightning-fast finality with ultra-low gas fees on Shardeum.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="vote-button px-8 py-6 text-lg">
              Start Voting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg bg-card/20 backdrop-blur-sm border-card-border hover:bg-card/30"
            >
              Create Your First Poll
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="card-gradient p-6 rounded-xl hover-lift">
              <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Tamper-Proof</h3>
              <p className="text-muted-foreground">
                Votes recorded immutably on-chain with complete transparency
              </p>
            </div>

            <div className="card-gradient p-6 rounded-xl hover-lift">
              <Zap className="h-12 w-12 text-secondary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Real-time results with Shardeum's instant finality
              </p>
            </div>

            <div className="card-gradient p-6 rounded-xl hover-lift">
              <DollarSign className="h-12 w-12 text-success mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Ultra-Low Fees</h3>
              <p className="text-muted-foreground">
                Vote for just fractions of a cent - accessible to all
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>
    </section>
  );
};

export default Hero;