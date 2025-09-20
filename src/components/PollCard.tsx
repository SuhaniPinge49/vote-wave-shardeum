import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  endDate: string;
  hasVoted: boolean;
  isActive: boolean;
}

interface PollCardProps {
  poll: Poll;
}

const PollCard = ({ poll }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(poll.hasVoted);
  const { toast } = useToast();

  const handleVote = async () => {
    if (!selectedOption) return;

    setIsVoting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setHasVoted(true);
      setIsVoting(false);
      toast({
        title: "Vote Cast Successfully!",
        description: "Your vote has been recorded on the Shardeum blockchain.",
      });
    }, 2000);
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(poll.endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <Card className="card-gradient p-6 hover-lift">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{poll.title}</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            poll.isActive 
              ? "bg-success/20 text-success border border-success/30" 
              : "bg-muted/20 text-muted-foreground border border-muted/30"
          }`}>
            {poll.isActive ? "Active" : "Ended"}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{poll.description}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{poll.totalVotes} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{getTimeRemaining()}</span>
          </div>
        </div>
      </div>

      {/* Voting Options */}
      <div className="space-y-3 mb-6">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
          const isSelected = selectedOption === option.id;
          
          return (
            <div
              key={option.id}
              className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                hasVoted
                  ? "bg-card-secondary/30 border-card-border cursor-default"
                  : isSelected
                  ? "bg-primary/10 border-primary"
                  : "bg-card-secondary/20 border-card-border hover:border-primary/50"
              }`}
              onClick={() => !hasVoted && poll.isActive && setSelectedOption(option.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{option.text}</span>
                {hasVoted && (
                  <span className="text-sm text-muted-foreground">
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              
              {hasVoted && (
                <Progress 
                  value={percentage} 
                  className="h-2 progress-fill"
                />
              )}
              
              {!hasVoted && isSelected && (
                <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-primary" />
              )}
            </div>
          );
        })}
      </div>

      {/* Vote Button */}
      {poll.isActive && !hasVoted && (
        <Button
          onClick={handleVote}
          disabled={!selectedOption || isVoting}
          className="w-full vote-button"
        >
          {isVoting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
              Casting Vote...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Cast Your Vote
            </>
          )}
        </Button>
      )}
      
      {hasVoted && (
        <div className="flex items-center justify-center text-success font-medium">
          <CheckCircle className="h-5 w-5 mr-2" />
          Vote Successfully Cast
        </div>
      )}
    </Card>
  );
};

export default PollCard;