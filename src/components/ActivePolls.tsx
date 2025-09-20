import { useState, useEffect } from "react";
import PollCard from "./PollCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockPolls = [
  {
    id: "1",
    title: "Choose Our Next Community Event",
    description: "Help us decide what type of event the community would like to see next month. Your vote matters!",
    options: [
      { id: "1a", text: "Virtual Gaming Tournament", votes: 45 },
      { id: "1b", text: "Tech Workshop Series", votes: 32 },
      { id: "1c", text: "Community Meetup", votes: 28 },
      { id: "1d", text: "Hackathon Weekend", votes: 51 }
    ],
    totalVotes: 156,
    endDate: "2024-01-15T18:00:00",
    hasVoted: false,
    isActive: true
  },
  {
    id: "2",
    title: "Protocol Upgrade Proposal #42",
    description: "Vote on the proposed changes to the voting mechanism including gas optimization and new features.",
    options: [
      { id: "2a", text: "Approve Upgrade", votes: 234 },
      { id: "2b", text: "Reject Upgrade", votes: 89 },
      { id: "2c", text: "Request Modifications", votes: 67 }
    ],
    totalVotes: 390,
    endDate: "2024-01-20T12:00:00",
    hasVoted: true,
    isActive: true
  },
  {
    id: "3",
    title: "Best Blockchain for DeFi",
    description: "Community survey: Which blockchain do you think offers the best DeFi ecosystem?",
    options: [
      { id: "3a", text: "Ethereum", votes: 156 },
      { id: "3b", text: "Shardeum", votes: 298 },
      { id: "3c", text: "Polygon", votes: 87 },
      { id: "3d", text: "Solana", votes: 134 }
    ],
    totalVotes: 675,
    endDate: "2024-01-10T23:59:59",
    hasVoted: false,
    isActive: false
  }
];

const ActivePolls = () => {
  const [polls, setPolls] = useState(mockPolls);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "ended">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from blockchain
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "active") return matchesSearch && poll.isActive;
    if (filter === "ended") return matchesSearch && !poll.isActive;
    return matchesSearch;
  });

  const activeCount = polls.filter(p => p.isActive).length;
  const totalVotes = polls.reduce((acc, poll) => acc + poll.totalVotes, 0);

  return (
    <section id="polls" className="py-16">
      <div className="container mx-auto px-4">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Active Polls
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Participate in community decisions on the Shardeum blockchain
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <Card className="card-gradient p-6">
              <div className="text-2xl font-bold text-primary mb-1">{activeCount}</div>
              <div className="text-sm text-muted-foreground">Active Polls</div>
            </Card>
            <Card className="card-gradient p-6">
              <div className="text-2xl font-bold text-secondary mb-1">{totalVotes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Votes Cast</div>
            </Card>
            <Card className="card-gradient p-6 pulse-glow">
              <div className="text-2xl font-bold text-success mb-1">$0.001</div>
              <div className="text-sm text-muted-foreground">Avg. Gas Fee</div>
            </Card>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search polls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-card border-card-border"
            />
          </div>
          
          <div className="flex gap-2">
            {(["all", "active", "ended"] as const).map((filterType) => (
              <Button
                key={filterType}
                onClick={() => setFilter(filterType)}
                variant={filter === filterType ? "default" : "outline"}
                className={filter === filterType ? "vote-button" : "bg-card border-card-border hover:bg-primary/10"}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="card-gradient p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted/20 rounded mb-4" />
                  <div className="h-4 bg-muted/20 rounded mb-6" />
                  <div className="space-y-3">
                    <div className="h-12 bg-muted/20 rounded" />
                    <div className="h-12 bg-muted/20 rounded" />
                    <div className="h-12 bg-muted/20 rounded" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Polls Grid */}
        {!isLoading && (
          <>
            {filteredPolls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {filteredPolls.map((poll) => (
                  <PollCard key={poll.id} poll={poll} />
                ))}
              </div>
            ) : (
              <Card className="card-gradient p-12 text-center">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Polls Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Try adjusting your search or filter criteria"
                    : "Be the first to create a poll for the community!"}
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ActivePolls;