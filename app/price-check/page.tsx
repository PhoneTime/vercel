// Phone repair price data (Updated with new models and specific Pixel screen prices)
const repairPrices = {
  iPhone: {
    // --- NEW iPhone 16 Series (Estimated Prices) ---
    "iPhone 16 Pro Max": {
      "Screen Replacement": 409, "Battery Replacement": 159, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 249,
    },
    "iPhone 16 Pro": {
      "Screen Replacement": 389, "Battery Replacement": 159, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 239,
    },
    "iPhone 16 Plus": {
      "Screen Replacement": 279, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 219,
    },
    "iPhone 16": {
      "Screen Replacement": 269, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 209,
    },
    // --- End NEW iPhone 16 Series ---
    "iPhone 15 Pro Max": {
      "Screen Replacement": 389, "Battery Replacement": 149, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 229,
    },
    "iPhone 15 Pro": {
      "Screen Replacement": 369, "Battery Replacement": 149, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 219,
    },
    "iPhone 15 Plus": {
      "Screen Replacement": 259, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 209,
    },
    "iPhone 15": {
      "Screen Replacement": 249, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 199,
    },
    // ... (rest of existing iPhone models) ...
    "iPhone SE (1st gen)": {
      "Screen Replacement": 109, "Battery Replacement": 89, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
  },
  iPad: {
    // ... (iPad models remain the same) ...
    "iPad mini (5th gen)": {
      "Screen Replacement": 279, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 159, "Back Glass Repair": 139,
    },
  },
  Samsung: {
    // S Series
    "Galaxy S25 Ultra": {
      "Screen Replacement": 529, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S25+": {
      "Screen Replacement": 389, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S25": {
      "Screen Replacement": 349, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    // ... (rest of existing S Series) ...
    "Galaxy S10e": {
      "Screen Replacement": 309, "Battery Replacement": 89, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },

    // A Series
    // --- NEW Samsung A Series (Estimated Prices) ---
     "Galaxy A56": {
      "Screen Replacement": 219, "Battery Replacement": 89, "Charging Port Repair": 89, "Water Damage Treatment": 109, "Back Glass Repair": 99,
    },
     "Galaxy A55": {
      "Screen Replacement": 209, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 109, "Back Glass Repair": 89,
    },
    "Galaxy A36": {
      "Screen Replacement": 199, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy A35": {
      "Screen Replacement": 189, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
     "Galaxy A25": {
      "Screen Replacement": 189, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy A16": {
      "Screen Replacement": 179, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 89, "Back Glass Repair": 89,
    },
    // --- End NEW Samsung A Series ---
    // ... (rest of existing A Series) ...
    "Galaxy A12": {
      "Screen Replacement": 159, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 79, "Back Glass Repair": 79,
    },

    // Note Series
    // ... (Note Series remain the same) ...
    "Galaxy Note 8": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
  },
  Google: {
     // --- NEW/Updated Google Pixel Models (Prices as requested/estimated) ---
    "Pixel Fold 9": {
      "Screen Replacement": 699, // <-- UPDATED PRICE
      "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 199, "Back Glass Repair": 199,
    },
    "Pixel 9 Pro XL": {
      "Screen Replacement": 519, // <-- UPDATED PRICE
      "Battery Replacement": 129, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 149,
    },
     "Pixel 9 Pro": {
      "Screen Replacement": 499, // <-- UPDATED PRICE
      "Battery Replacement": 129, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 139,
    },
     "Pixel 9": {
      "Screen Replacement": 329, "Battery Replacement": 119, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 129,
    },
     "Pixel 8 Pro": {
      "Screen Replacement": 399, // <-- UPDATED PRICE
      "Battery Replacement": 119, "Charging Port Repair": 109, "Water Damage Treatment": 149, "Back Glass Repair": 129,
    },
    "Pixel 8a": { // <-- NEW MODEL
      "Screen Replacement": 279, // <-- UPDATED PRICE
      "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 129, "Back Glass Repair": 99,
    },
    "Pixel 8": {
      "Screen Replacement": 309, "Battery Replacement": 109, "Charging Port Repair": 109, "Water Damage Treatment": 149, "Back Glass Repair": 119,
    },
     // --- End NEW Google Pixel Models ---
    "Pixel 7 Pro": {
      "Screen Replacement": 299, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 139, "Back Glass Repair": 119,
    },
    "Pixel 7": {
      "Screen Replacement": 289, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 139, "Back Glass Repair": 109,
    },
    "Pixel 6 Pro": {
      "Screen Replacement": 279, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 129, "Back Glass Repair": 109,
    },
    "Pixel 6": {
      "Screen Replacement": 269, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 129, "Back Glass Repair": 99,
    },
    "Pixel 6a": {
      "Screen Replacement": 269, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 5": {
      "Screen Replacement": 249, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 4 XL": {
      "Screen Replacement": 249, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 4": {
      "Screen Replacement": 249, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 79,
    },
  },
} // End of repairPrices object