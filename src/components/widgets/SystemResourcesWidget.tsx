import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/buttons/Button";
import { Icon } from "@iconify/react";

interface SystemResourcesWidgetProps {
  isEditing?: boolean;
  onDelete?: () => void;
  className?: string;
}

interface SystemStats {
  cpuUsage: number;
  memoryUsage: number;
  memoryTotal: number;
  memoryUsed: number;
  diskUsage: number;
}

export function SystemResourcesWidget({
  isEditing = false,
  onDelete,
  className = "",
}: SystemResourcesWidgetProps) {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 0,
    memoryUsage: 0,
    memoryTotal: 0,
    memoryUsed: 0,
    diskUsage: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate system stats (in a real implementation, this would come from system APIs)
    const fetchSystemStats = () => {
      try {
        // Simulate realistic system stats
        const cpu = Math.floor(Math.random() * 100);
        const memTotal = 16384; // 16GB in MB
        const memUsed = Math.floor(memTotal * (Math.random() * 0.8 + 0.1)); // 10-90% of total
        const memPercent = Math.round((memUsed / memTotal) * 100);
        const disk = Math.floor(Math.random() * 100);

        setStats({
          cpuUsage: cpu,
          memoryUsage: memPercent,
          memoryTotal: memTotal,
          memoryUsed: memUsed,
          diskUsage: disk,
        });
      } catch (err) {
        setError("Failed to fetch system stats");
        console.error("System stats error:", err);
      }
    };

    // Initial fetch
    fetchSystemStats();

    // Set up interval to update stats every 5 seconds
    const interval = setInterval(fetchSystemStats, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const formatMemory = (mb: number): string => {
    if (mb < 1024) return `${mb} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  return (
    <Card
      className={`h-full ${className} ${isEditing ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="p-2 pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-minecraft lowercase">System Resources</h3>
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
      <div className="p-2 pt-0">
        {error ? (
          <p className="text-red-400 text-center py-4">{error}</p>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-lg mb-1">
                <span className="font-minecraft lowercase">CPU</span>
                <span className="font-minecraft lowercase">
                  {stats.cpuUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stats.cpuUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-lg mb-1">
                <span className="font-minecraft lowercase">Memory</span>
                <span className="font-minecraft lowercase">
                  {formatMemory(stats.memoryUsed)} /{" "}
                  {formatMemory(stats.memoryTotal)} ({stats.memoryUsage}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${stats.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-lg mb-1">
                <span className="font-minecraft lowercase">Disk</span>
                <span className="font-minecraft lowercase">
                  {stats.diskUsage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${stats.diskUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
