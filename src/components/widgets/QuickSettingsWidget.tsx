import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/buttons/Button";
import { Icon } from "@iconify/react";
import { useThemeStore } from "../../store/useThemeStore";
import {
  useBackgroundEffectStore,
  BACKGROUND_EFFECTS,
} from "../../store/background-effect-store";

interface QuickSettingsWidgetProps {
  isEditing?: boolean;
  onDelete?: () => void;
  className?: string;
}

export function QuickSettingsWidget({
  isEditing = false,
  onDelete,
  className = "",
}: QuickSettingsWidgetProps) {
  const {
    isBackgroundAnimationEnabled,
    toggleBackgroundAnimation,
    accentColor,
    setCustomAccentColor,
  } = useThemeStore();

  const { currentEffect, setCurrentEffect } = useBackgroundEffectStore();

  const [tempColor, setTempColor] = useState(accentColor.value);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempColor(e.target.value);
    setCustomAccentColor(e.target.value);
  };

  const toggleBackgroundEffect = () => {
    // Toggle between retro grid and none for simplicity
    const newEffect =
      currentEffect === BACKGROUND_EFFECTS.RETRO_GRID
        ? BACKGROUND_EFFECTS.NONE
        : BACKGROUND_EFFECTS.RETRO_GRID;
    setCurrentEffect(newEffect);
  };

  return (
    <Card
      className={`h-full ${className} ${isEditing ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="p-2 pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-minecraft lowercase">Quick Settings</h3>
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
      <div className="p-2 pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-minecraft lowercase text-sm">
            Background Animation
          </span>
          <Button
            variant={isBackgroundAnimationEnabled ? "default" : "ghost"}
            size="sm"
            onClick={toggleBackgroundAnimation}
            className="w-12 h-8"
          >
            {isBackgroundAnimationEnabled ? "ON" : "OFF"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-minecraft lowercase text-sm">
            Background Effect
          </span>
          <Button
            variant={
              currentEffect !== BACKGROUND_EFFECTS.NONE ? "default" : "ghost"
            }
            size="sm"
            onClick={toggleBackgroundEffect}
            className="w-12 h-8"
          >
            {currentEffect !== BACKGROUND_EFFECTS.NONE ? "ON" : "OFF"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-minecraft lowercase text-sm">Accent Color</span>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={tempColor}
              onChange={handleColorChange}
              className="w-8 h-8 border-0 rounded cursor-pointer"
            />
            <span className="text-xs">{tempColor}</span>
          </div>
        </div>

        <div className="pt-2">
          <span className="font-minecraft lowercase text-sm block mb-2">
            Background Effect
          </span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={
                currentEffect === BACKGROUND_EFFECTS.NONE ? "default" : "ghost"
              }
              size="sm"
              onClick={() => setCurrentEffect(BACKGROUND_EFFECTS.NONE)}
              className="text-xs px-2 py-1"
            >
              None
            </Button>
            <Button
              variant={
                currentEffect === BACKGROUND_EFFECTS.RETRO_GRID
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => setCurrentEffect(BACKGROUND_EFFECTS.RETRO_GRID)}
              className="text-xs px-2 py-1"
            >
              Retro Grid
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
