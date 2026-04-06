# Developer Guidelines

## 1. Adding a New Language

1. Duplicate `src/locales/en/translation.json` in a new folder (e.g., `src/locales/fr/translation.json`).
2. Translate all the values in the JSON file, including:
   - `app.*` keys (UI buttons, labels, review screen text)
   - `questions.*` keys (all question titles, descriptions, options, and **placeholders** for textarea questions)
   - `misc.*` keys (step labels)
   - `markdown.*` keys (blueprint output labels)
3. Open `src/i18n.js`:
   - Import the new translation file.
   - Add it to the `resources` object.
   - Add the language code to the `supportedLangs` array.
4. Open `src/App.jsx` and add a new `<option>` to the `<select>` tag inside the Language Switcher.

## 2. Adding / Modifying Questions

All questions are configured inside `src/data/questionMap.jsx`.
1. To add a new question, define a new key in `questionMap.jsx` with `stepGroup`, `title`, `type`, and `next`/`options`.
2. For **textarea** questions, add a `placeholder` key in the locale files under `questions.YOUR_KEY.placeholder`.
3. To modify actual content, open `src/locales/{lang}/translation.json` and change the corresponding string inside the `questions` object.
4. Use the structure `t('questions.YOUR_KEY.title')` in `questionMap.jsx` to map strings accordingly.
5. If the new question generates output, update `src/utils/markdownGenerator.js` to include it.

## 3. Deployment with Cloudflare AI

Since this app relies on Cloudflare AI for the streaming summary feature:
- Place your `CF_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` inside a `.env` file for local development.
- For deployment on Cloudflare Pages, navigate to the Cloudflare Dashboard -> Pages Setup -> Settings -> Environment Variables, and set:
  - `CF_API_TOKEN`: Your API token.
  - `CLOUDFLARE_ACCOUNT_ID`: Your exact account ID.
- The AI endpoint uses `stream: true` to deliver real-time streamed text to the client.
- A 30-second client-side timeout is configured. If exceeded, the user sees an error with a Retry button.

## 4. Updating the Version

When releasing a new version:
1. Update `version` in `package.json`.
2. Update `app.version` in all 3 locale files (`src/locales/en/th/de`).
3. The version badge in the header reads from `t('app.version')`.
