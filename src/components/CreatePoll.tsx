import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, Calendar, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePoll = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    endDate: "",
    options: ["", ""]
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({
        ...formData,
        options: [...formData.options, ""]
      });
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const validOptions = formData.options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      toast({
        title: "Invalid Options",
        description: "Please provide at least 2 voting options.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate blockchain deployment
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Poll Created Successfully!",
        description: "Your poll has been deployed to the Shardeum blockchain.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        endDate: "",
        options: ["", ""]
      });
    }, 3000);
  };

  return (
    <section id="create" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create a New Poll
            </h2>
            <p className="text-muted-foreground text-lg">
              Deploy your poll to the Shardeum blockchain in seconds
            </p>
          </div>

          {/* Form */}
          <Card className="card-gradient p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Poll Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Choose our next community event"
                  className="bg-card-secondary border-card-border"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide details about what you're voting on..."
                  className="bg-card-secondary border-card-border min-h-[100px]"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-base font-medium">
                  Voting End Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-card-secondary border-card-border pl-10"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Voting Options *
                  </Label>
                  <Button
                    type="button"
                    onClick={addOption}
                    disabled={formData.options.length >= 6}
                    variant="outline"
                    size="sm"
                    className="bg-card-secondary border-card-border hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="bg-card-secondary border-card-border"
                      />
                      {formData.options.length > 2 && (
                        <Button
                          type="button"
                          onClick={() => removeOption(index)}
                          variant="outline"
                          size="icon"
                          className="bg-destructive/10 border-destructive/30 hover:bg-destructive/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isCreating}
                className="w-full vote-button py-6 text-lg"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Deploying to Shardeum...
                  </>
                ) : (
                  <>
                    <Settings className="h-5 w-5 mr-2" />
                    Create Poll on Blockchain
                  </>
                )}
              </Button>

              {/* Gas Fee Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Estimated gas fee: ~$0.001 (Ultra-low on Shardeum!)</p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreatePoll;