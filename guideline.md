# Developer Guidelines

## 1. Adding a New Language

1. Duplicate `src/locales/en/translation.json` in a new folder (e.g., `src/locales/fr/translation.json`).
2. Translate all the values in the JSON file.
3. Open `src/i18n.js` and import the new translation file. Add it to the `resources` object.
4. Open `src/App.jsx` and add a new `<option>` to the `<select>` tag inside the Language Switcher.

## 2. Adding / Modifying Questions

All questions are configured inside `src/data/questionMap.jsx`.
1. To change questions without translating, you can modify the default behavior in the map.
2. To modify actual content, open `src/locales/{lang}/translation.json` and change the corresponding string inside the `questions` object.
3. Use the structure `t('questions.YOUR_KEY.title')` in `questionMap.jsx` to map strings accordingly.

## 3. Deployment with Cloudflare AI

Since this app now relies on Cloudflare AI for the Comparison feature:
- Place your `CF_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` inside a `.env` file for local development.
- For deployment on Cloudflare Pages, make sure to navigate to the Cloudflare Dashboard -> Pages Setup -> Settings -> Environment Variables, and set:
  - `CF_API_TOKEN`: Your API token.
  - `CLOUDFLARE_ACCOUNT_ID`: Your exact account ID.
