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

import { getFunctions, httpsCallable } from "firebase/functions";

export default function Control() {
  const { toast } = useToast();

  // 🔹 State untuk toggle Auto-Feeding dan dialog
  const [autoFeeding, setAutoFeeding] = useState(true);
  const [showFeedDialog, setShowFeedDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Firebase Functions: setup callable function
  const functions = getFunctions();
  const feedNowCallable = httpsCallable(functions, "feedNow");

  // 🔹 Toggle Auto-Feeding
  const handleAutoFeedingToggle = (checked: boolean) => {
    setAutoFeeding(checked);
    toast({
      title: checked ? "Auto-feeding enabled" : "Auto-feeding disabled",
      description: checked 
        ? "Your cat will be fed according to the schedule" 
        : "Automatic feeding has been turned off",
    });
  };

  // 🔹 Handle Feed Now
  const handleFeedNow = async () => {
    setShowFeedDialog(false);
    setLoading(true);

    toast({
      title: "Feeding in progress",
      description: "Dispensing food now...",
    });

    try {
      // Memanggil Cloud Function feedNow
      const res = await feedNowCallable({ amount: 50 }); // default 50g
      const data = res.data as { commandId?: string };

      console.log("FeedNow success:", data);

      toast({
        title: "Feeding command sent!",
        description: `Command ID: ${data.commandId}`,
      });
    } catch (err: any) {
      console.error("FeedNow failed:", err);
      toast({
        title: "Error sending command",
        description: err?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
        <p className="text-muted-foreground mt-1">Manage feeding controls</p>
      </div>

      {/* Manual Feed Card */}
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
            disabled={loading}
          >
            <Zap className="h-4 w-4 mr-2" />
            {loading ? "Feeding..." : "Feed Now"}
          </Button>
        </CardContent>
      </Card>

      {/* Auto-Feeding Card */}
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

      {/* Feed Now Dialog */}
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
            <AlertDialogAction 
              onClick={handleFeedNow} 
              data-testid="button-confirm-manual-feed"
              disabled={loading}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
