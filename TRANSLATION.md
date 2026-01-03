# Translation Guide for JS Launcher

## Overview
The JS Launcher now supports internationalization (i18n) using the i18next library. This guide explains how to add new translations and maintain the existing ones.

## Project Structure
```
public/
└── locales/
    ├── en/
    │   └── translation.json
    └── de/
        └── translation.json
```

## Adding New Translations

### 1. In Components
To add a new translatable string in a component:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('category.key', 'Default English text')}</h1>
    </div>
  );
};
```

### 2. In Translation Files
Add the new key to `public/locales/en/translation.json`:

```json
{
  "category": {
    "key": "Default English text"
  }
}
```

Then add the corresponding translation to other language files:

```json
{
  "category": {
    "key": "Übersetzter deutscher Text"
  }
}
```

## Translation Keys Convention
- Use nested objects to organize translations: `category.subcategory.key`
- Use descriptive names for keys
- Always provide a fallback English string as the second parameter to `t()`

## Available Languages
- English (en) - source language
- German (de)

## Crowdin Integration
The project is configured for use with Crowdin for translation management. The configuration file is `crowdin.yml`.

To sync translations with Crowdin:
```bash
# Download latest translations from Crowdin
crowdin download

# Upload new source strings to Crowdin
crowdin upload sources
```

## Adding New Languages
1. Create a new directory in `public/locales/` with the language code (e.g., `es` for Spanish)
2. Copy the English `translation.json` file to the new directory
3. Translate all the strings in the new file
4. Add the language to the Crowdin configuration if using Crowdin

## Testing Translations
To test translations:
1. Run the application
2. Use the language switcher in the top-right corner to change languages
3. Verify that all text appears correctly in the selected language