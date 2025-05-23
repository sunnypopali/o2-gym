import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const days = ["M", "T", "W", "Th", "F", "S/S"];

const initialWeek = {
  dateRange: "27-May to 02-Jun",
  days: days.map((day) => ({
    day,
    workout: "",
    cardio: "",
    notes: "",
    done: false
  })),
  checkpoint: ""
};

export default function GymProgressApp() {
  const [weeks, setWeeks] = useState(Array.from({ length: 12 }, (_, i) => ({
    ...initialWeek,
    dateRange: new Date(2025, 4, 27 + i * 7).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    }) + " to " + new Date(2025, 4, 27 + i * 7 + 6).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    })
  })));

  const handleChange = (weekIndex, dayIndex, field, value) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].days[dayIndex][field] = value;
    setWeeks(newWeeks);
  };

  const toggleDone = (weekIndex, dayIndex) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].days[dayIndex].done = !newWeeks[weekIndex].days[dayIndex].done;
    setWeeks(newWeeks);
  };

  const handleCheckpointChange = (weekIndex, value) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].checkpoint = value;
    setWeeks(newWeeks);
  };

  return (
    <div className="p-4 grid gap-6">
      {weeks.map((week, weekIndex) => (
        <Card key={weekIndex} className="shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Week {weekIndex + 1} ({week.dateRange})</h2>
            {week.days.map((day, dayIndex) => (
              <div key={dayIndex} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                <div className="font-semibold">{day.day}</div>
                <Input
                  placeholder="Workout Details"
                  value={day.workout}
                  onChange={(e) => handleChange(weekIndex, dayIndex, "workout", e.target.value)}
                />
                <Input
                  placeholder="Cardio"
                  value={day.cardio}
                  onChange={(e) => handleChange(weekIndex, dayIndex, "cardio", e.target.value)}
                />
                <Textarea
                  placeholder="Notes"
                  value={day.notes}
                  onChange={(e) => handleChange(weekIndex, dayIndex, "notes", e.target.value)}
                />
                <Button onClick={() => toggleDone(weekIndex, dayIndex)} variant={day.done ? "default" : "outline"}>
                  {day.done ? "✔ Done" : "Mark Done"}
                </Button>
              </div>
            ))}
            <div className="mt-4">
              <Textarea
                placeholder="Weekly Checkpoint Notes (Progress, Challenges, Adjustments)"
                value={week.checkpoint}
                onChange={(e) => handleCheckpointChange(weekIndex, e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}