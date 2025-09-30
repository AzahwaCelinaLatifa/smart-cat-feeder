import { Camera as CameraIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Camera() {
  const { toast } = useToast();

  const handleTestAI = () => {
    toast({
      title: "AI Detection triggered",
      description: "Running pet detection analysis...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Camera Feed</h1>
        <p className="text-muted-foreground mt-1">Monitor your pet in real-time</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
          <CameraIcon className="h-24 w-24 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Live Feed Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Camera streaming will be available in the next update. You'll be able to watch your pet and monitor their feeding habits in real-time.
            </p>
          </div>
          <div className="aspect-video w-full max-w-2xl bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <p className="text-muted-foreground">Video stream placeholder</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Detection
          </CardTitle>
          <CardDescription>
            Test the AI-powered pet detection system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleTestAI}
            data-testid="button-test-ai"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Test AI Detection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
