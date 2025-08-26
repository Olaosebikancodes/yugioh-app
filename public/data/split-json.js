// split-json.js
import fs from "fs";

// Load the big JSON file
const cards = JSON.parse(fs.readFileSync("cards.json", "utf8"));

// Buckets for A-Z and 0-9
const buckets = {};

// Initialize buckets
for (let i = 65; i <= 90; i++) {
  buckets[String.fromCharCode(i)] = [];
}
buckets["0-9"] = [];

// Put each card into the right bucket
cards.forEach((c) => {
  const firstChar = String(c.name).charAt(0).toUpperCase();
  if (/[0-9]/.test(firstChar)) {
    buckets["0-9"].push(c);
  } else if (/[A-Z]/.test(firstChar)) {
    buckets[firstChar].push(c);
  } else {
    // fallback in case of weird characters
    buckets["0-9"].push(c);
  }
});

// Save each bucket into its own JSON file
Object.keys(buckets).forEach((key) => {
  const filename = `${key}.json`;
  fs.writeFileSync(filename, JSON.stringify(buckets[key], null, 2));
  console.log(`Created ${filename} with ${buckets[key].length} cards`);
});

console.log("✅ Split complete!");
