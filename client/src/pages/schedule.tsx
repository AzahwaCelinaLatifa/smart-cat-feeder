import { useEffect, useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Service
import { addSchedule, deleteSchedule } from "@/lib/schedule";
import { listenSchedules } from "@/src/lib/schedule";

type Schedule = {
  id: string;
  time: string;
  amount: number;
};

export default function SchedulePage() {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newAmount, setNewAmount] = useState(50);

  // Listener realtime
  useEffect(() => {
    const unsubscribe = listenSchedules((data) => setSchedules(data));
    return () => unsubscribe();
  }, []);

  // Tambah
  const handleAddSchedule = async () => {
    if (!newTime) return;
    await addSchedule({ time: newTime, amount: newAmount });
    setShowAddDialog(false);
    setNewTime("");
    setNewAmount(50);
    toast({
      title: "Added",
      description: `Feeding at ${formatTime(newTime)} (${newAmount}g)`,
    });
  };

  // Hapus
  const handleDeleteSchedule = async (id: string, time: string) => {
    await deleteSchedule(id);
    toast({
      title: "Removed",
      description: `Schedule at ${formatTime(time)} deleted`,
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feeding Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage your cat's feeding times
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="grid gap-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="border-l-4 border-l-primary">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-xl font-semibold">
                  {formatTime(schedule.time)} ({schedule.amount}g)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteSchedule(schedule.id, schedule.time)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Schedule</DialogTitle>
            <DialogDescription>
              Pick time and portion
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (grams)</Label>
              <Input
                id="amount"
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSchedule}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
  // Fetch initial schedules (in case listener misses any)