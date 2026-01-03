import { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/buttons/Button";
import { Icon } from "@iconify/react";

interface ClockTimeDisplayWidgetProps {
  isEditing?: boolean;
  onDelete?: () => void;
  className?: string;
}

export function ClockTimeDisplayWidget({
  isEditing = false,
  onDelete,
  className = "",
}: ClockTimeDisplayWidgetProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      className={`h-full ${className} ${isEditing ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="p-2 pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-minecraft lowercase">Clock</h3>
          {isEditing && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
            >
              <Icon icon="pixel:trash" className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 pt-0 flex flex-col items-center justify-center h-[calc(100%-2rem)]">
        <div className="text-center">
          <div className="text-3xl font-minecraft lowercase mb-1">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm font-minecraft lowercase text-gray-300">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </Card>
  );
}
