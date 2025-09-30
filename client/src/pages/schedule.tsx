import { useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type Schedule = {
  id: string;
  time: string;
};

export default function Schedule() {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: "1", time: "07:00" },
    { id: "2", time: "12:00" },
    { id: "3", time: "19:00" },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTime, setNewTime] = useState("");

  const handleAddSchedule = () => {
    if (!newTime) return;
    
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      time: newTime,
    };
    
    setSchedules([...schedules, newSchedule].sort((a, b) => a.time.localeCompare(b.time)));
    setShowAddDialog(false);
    setNewTime("");
    
    toast({
      title: "Schedule added",
      description: `New feeding time added at ${formatTime(newTime)}`,
    });
  };

  const handleDeleteSchedule = (id: string, time: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
    toast({
      title: "Schedule removed",
      description: `Feeding time at ${formatTime(time)} has been removed`,
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
          <h1 className="text-3xl font-bold text-foreground">Feeding Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage your cat's feeding times</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} data-testid="button-add-schedule">
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      <div className="grid gap-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="border-l-4 border-l-primary">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold" data-testid={`text-schedule-${schedule.id}`}>
                  {formatTime(schedule.time)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteSchedule(schedule.id, schedule.time)}
                data-testid={`button-delete-${schedule.id}`}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feeding Schedule</DialogTitle>
            <DialogDescription>
              Set a new time for automatic feeding
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
                data-testid="input-schedule-time"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="button-cancel-schedule">
              Cancel
            </Button>
            <Button onClick={handleAddSchedule} data-testid="button-save-schedule">
              Add Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
