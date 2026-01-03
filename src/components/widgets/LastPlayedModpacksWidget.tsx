import { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profile-store";
import { Profile } from "../../types/profile";
import { Card } from "../ui/Card";
import { Button } from "../ui/buttons/Button";
import { Icon } from "@iconify/react";

interface LastPlayedModpacksWidgetProps {
  isEditing?: boolean;
  onDelete?: () => void;
  className?: string;
}

export function LastPlayedModpacksWidget({
  isEditing = false,
  onDelete,
  className = "",
}: LastPlayedModpacksWidgetProps) {
  const { profiles } = useProfileStore();
  const [recentProfiles, setRecentProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    // Sort profiles by last played date (most recent first)
    const sortedProfiles = [...profiles]
      .filter((profile) => profile.last_played)
      .sort((a, b) => {
        if (!a.last_played || !b.last_played) return 0;
        return (
          new Date(b.last_played).getTime() - new Date(a.last_played).getTime()
        );
      })
      .slice(0, 5); // Show top 5 most recently played

    setRecentProfiles(sortedProfiles);
  }, [profiles]);

  return (
    <Card
      className={`h-full ${className} ${isEditing ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="p-2 pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-minecraft lowercase">Last Played</h3>
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
        {recentProfiles.length > 0 ? (
          <div className="space-y-2">
            {recentProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <Icon
                  icon={
                    profile.loader === "vanilla"
                      ? "pixel:grid-solid"
                      : `pixel:${profile.loader}`
                  }
                  className="w-5 h-5 mr-2"
                />
                <span className="font-minecraft lowercase truncate">
                  {profile.name}
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  {profile.last_played
                    ? new Date(profile.last_played).toLocaleDateString()
                    : ""}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            No recently played modpacks
          </p>
        )}
      </div>
    </Card>
  );
}
