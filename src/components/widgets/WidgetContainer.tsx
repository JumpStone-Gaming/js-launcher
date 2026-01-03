import React, { useState, useCallback, useRef } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/buttons/Button";
import { LastPlayedModpacksWidget } from "./LastPlayedModpacksWidget";
import { SystemResourcesWidget } from "./SystemResourcesWidget";
import { QuickSettingsWidget } from "./QuickSettingsWidget";
import { ClockTimeDisplayWidget } from "./ClockTimeDisplayWidget";
import { useThemeStore } from "../../store/useThemeStore";

// Define widget types
type WidgetType =
  | "lastPlayedModpacks"
  | "systemResources"
  | "quickSettings"
  | "clockTimeDisplay";

interface WidgetConfig {
  id: string;
  type: WidgetType;
}

interface WidgetContainerProps {
  className?: string;
}

export function WidgetContainer({ className = "" }: WidgetContainerProps) {
  const { widgetConfig, setWidgetConfig } = useThemeStore();
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    // Initialize with default widget if no config exists
    if (!widgetConfig || widgetConfig.length === 0) {
      return [{ id: "widget-1", type: "lastPlayedModpacks" }];
    }
    return widgetConfig;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [availableWidgets] = useState<WidgetType[]>([
    "lastPlayedModpacks",
    "systemResources",
    "quickSettings",
    "clockTimeDisplay",
  ]);

  // Save widget config to store when it changes
  React.useEffect(() => {
    setWidgetConfig(widgets);
  }, [widgets, setWidgetConfig]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setShowAddMenu(false);
    }
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const addWidget = (type: WidgetType) => {
    const newWidget: WidgetConfig = {
      id: `widget-${Date.now()}`,
      type,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setShowAddMenu(false);
  };

  const moveWidget = (fromIndex: number, toIndex: number) => {
    const newWidgets = [...widgets];
    const [movedWidget] = newWidgets.splice(fromIndex, 1);
    newWidgets.splice(toIndex, 0, movedWidget);
    setWidgets(newWidgets);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
    if (isEditing) {
      e.currentTarget.classList.add("opacity-50", "ring-2", "ring-yellow-400");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      moveWidget(sourceIndex, targetIndex);
    }
    // Remove any visual feedback
    const elements = document.querySelectorAll(
      ".opacity-50.ring-2.ring-yellow-400"
    );
    elements.forEach((el) => {
      el.classList.remove("opacity-50", "ring-2", "ring-yellow-400");
    });
  };

  const handleDragEnd = () => {
    // Remove any visual feedback
    const elements = document.querySelectorAll(
      ".opacity-50.ring-2.ring-yellow-400"
    );
    elements.forEach((el) => {
      el.classList.remove("opacity-50", "ring-2", "ring-yellow-400");
    });
  };

  const renderWidget = (widget: WidgetConfig) => {
    const commonProps = {
      isEditing,
      onDelete: () => removeWidget(widget.id),
      className: isEditing ? "animate-pulse" : "",
    };

    switch (widget.type) {
      case "lastPlayedModpacks":
        return <LastPlayedModpacksWidget key={widget.id} {...commonProps} />;
      case "systemResources":
        return <SystemResourcesWidget key={widget.id} {...commonProps} />;
      case "quickSettings":
        return <QuickSettingsWidget key={widget.id} {...commonProps} />;
      case "clockTimeDisplay":
        return <ClockTimeDisplayWidget key={widget.id} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="pb-2 flex justify-between items-center">
        <h2 className="text-xl font-minecraft lowercase">Widgets</h2>
        <div className="flex space-x-2">
          <Button
            variant={isEditing ? "default" : "ghost"}
            size="sm"
            onClick={toggleEdit}
            className="flex items-center space-x-1"
          >
            <Icon icon="pixel:pencil" className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isEditing ? "Done" : "Edit"}
            </span>
          </Button>
          {isEditing && (
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center space-x-1"
            >
              <Icon icon="pixel:plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          )}
        </div>
      </div>

      {isEditing && showAddMenu && (
        <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-minecraft lowercase mb-2">Add Widget</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableWidgets.map((widgetType) => {
              const isAdded = widgets.some((w) => w.type === widgetType);
              if (isAdded) return null;

              return (
                <Button
                  key={widgetType}
                  variant="default"
                  size="sm"
                  onClick={() => addWidget(widgetType)}
                  className="text-xs"
                >
                  {widgetType
                    .split(/(?=[A-Z])/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-grow grid grid-cols-1 gap-4 overflow-y-auto">
        {widgets.length > 0 ? (
          widgets.map((widget, index) => (
            <div
              key={widget.id}
              draggable={isEditing}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={isEditing ? "cursor-move" : ""}
            >
              {renderWidget(widget)}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No widgets added. Click "Add" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
