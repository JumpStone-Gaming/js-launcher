import React from "react";
import { useTranslation } from "react-i18next";
import { ActionButton } from "./ui/ActionButton";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center gap-2">
      <ActionButton
        label="EN"
        variant={currentLanguage === "en" ? "primary" : "secondary"}
        icon="solar:world-bold"
        size="sm"
        onClick={() => changeLanguage("en")}
        className={
          currentLanguage === "en" ? "bg-blue-600 hover:bg-blue-700" : ""
        }
      />
      <ActionButton
        label="DE"
        variant={currentLanguage === "de" ? "primary" : "secondary"}
        icon="solar:world-bold"
        size="sm"
        onClick={() => changeLanguage("de")}
        className={
          currentLanguage === "de" ? "bg-blue-600 hover:bg-blue-700" : ""
        }
      />
    </div>
  );
};

export default LanguageSwitcher;
