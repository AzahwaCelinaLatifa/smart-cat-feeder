import { useState } from "react";
import { Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

type HistoryEntry = {
  id: string;
  time: string;
  status: "Fed" | "Skipped" | "Failed";
  timestamp: Date;
};

export default function History() {
  const { toast } = useToast();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: "1", time: "7:00 AM", status: "Fed", timestamp: new Date() },
    { id: "2", time: "12:00 PM", status: "Fed", timestamp: new Date() },
    { id: "3", time: "7:00 PM", status: "Skipped", timestamp: new Date() },
    { id: "4", time: "7:00 AM", status: "Fed", timestamp: new Date(Date.now() - 86400000) },
    { id: "5", time: "12:00 PM", status: "Failed", timestamp: new Date(Date.now() - 86400000) },
  ]);

  const handleClearHistory = () => {
    setHistory([]);
    setShowClearDialog(false);
    toast({
      title: "History cleared",
      description: "All feeding history has been removed",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Fed":
        return <CheckCircle className="h-4 w-4" />;
      case "Skipped":
        return <AlertCircle className="h-4 w-4" />;
      case "Failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Fed":
        return "default";
      case "Skipped":
        return "secondary";
      case "Failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feeding History</h1>
          <p className="text-muted-foreground mt-1">View past feeding records</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowClearDialog(true)}
          disabled={history.length === 0}
          data-testid="button-clear-history"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No feeding history available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry, index) => (
            <Card key={entry.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {index < history.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-2" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid={`text-history-time-${entry.id}`}>
                      {entry.time}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {entry.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={getStatusVariant(entry.status)} 
                  className="flex items-center gap-1"
                  data-testid={`badge-status-${entry.id}`}
                >
                  {getStatusIcon(entry.status)}
                  {entry.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all history?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all feeding history records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-clear">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory} data-testid="button-confirm-clear">
              Clear History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
