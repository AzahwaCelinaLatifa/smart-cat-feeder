import { useState } from "react";
import { Zap, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Control() {
  const { toast } = useToast();
  const [autoFeeding, setAutoFeeding] = useState(true);
  const [showFeedDialog, setShowFeedDialog] = useState(false);

  const handleAutoFeedingToggle = (checked: boolean) => {
    setAutoFeeding(checked);
    toast({
      title: checked ? "Auto-feeding enabled" : "Auto-feeding disabled",
      description: checked 
        ? "Your cat will be fed according to the schedule" 
        : "Automatic feeding has been turned off",
    });
  };

  const handleFeedNow = () => {
    setShowFeedDialog(false);
    toast({
      title: "Feeding in progress",
      description: "Dispensing food now...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
        <p className="text-muted-foreground mt-1">Manage feeding controls</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Manual Feed
          </CardTitle>
          <CardDescription>
            Dispense food immediately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowFeedDialog(true)}
            size="lg"
            className="w-full md:w-auto"
            data-testid="button-manual-feed"
          >
            <Zap className="h-4 w-4 mr-2" />
            Feed Now
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-primary" />
            Auto-Feeding
          </CardTitle>
          <CardDescription>
            Enable or disable scheduled feeding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-feeding" className="text-base">
              Automatic Feeding {autoFeeding ? "Enabled" : "Disabled"}
            </Label>
            <Switch
              id="auto-feeding"
              checked={autoFeeding}
              onCheckedChange={handleAutoFeedingToggle}
              data-testid="switch-auto-feeding"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {autoFeeding 
              ? "Your cat will be fed automatically according to the set schedule" 
              : "Scheduled feeding is currently disabled. Enable to resume automatic feeding"}
          </p>
        </CardContent>
      </Card>

      <AlertDialog open={showFeedDialog} onOpenChange={setShowFeedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feed your cat now?</AlertDialogTitle>
            <AlertDialogDescription>
              This will dispense food immediately, outside of the regular schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-manual-feed">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFeedNow} data-testid="button-confirm-manual-feed">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
