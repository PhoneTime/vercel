# Updating prices and models

The website reads its prices and model list from `data/prices.json`, which is exported from the Phone Time repair app.

## Change a price or add a new model

1. In the app, set the price (stock selling price) or add the model (Settings → Phone models) and give it a price.
2. In the app, go to Settings → **Export website prices** and download `prices.json`.
3. In VS Code, replace `data/prices.json` in this folder with the downloaded file.
4. Commit and push to `master`. Vercel updates www.phonetime.com.au in about a minute.

New models automatically get a price page (`/repair/<model>`), appear in the price check and in the booking form.

`data/prices-base.json` holds the older website prices. It only fills repairs the app has no price for yet, and can be deleted once every price is set in the app.
