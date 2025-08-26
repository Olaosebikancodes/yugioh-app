import fs from "fs";

// Load the big JSON
const cards = JSON.parse(fs.readFileSync("./cards.json", "utf-8"));

// ----------------------
// 1. Core dataset (lightweight)
// ----------------------
const cardsCore = cards.map(c => ({
  id: c.id,
  name: c.name,
  type: c.type,
  desc: c.desc,
  image_url: c.image_url,
}));

// ----------------------
// 2. Lookup by ID (fast access)
// ----------------------
const cardsById = {};
cards.forEach(c => {
  cardsById[c.id] = {
    name: c.name,
    type: c.type,
    desc: c.desc,
    image_url: c.image_url,
  };
});

// ----------------------
// 3. Search index (lowercased for speed)
// ----------------------
const searchIndex = cards.map(c => ({
  id: c.id,
  name: typeof c.name === "string" ? c.name.toLowerCase() : "",
  desc: typeof c.desc === "string" ? c.desc.toLowerCase() : "",
}));


// ----------------------
// 4. Split by type
// ----------------------
const monsters = cards.filter(c => c.type.toLowerCase().includes("monster"));
const spells = cards.filter(c => c.type.toLowerCase().includes("spell"));
const traps = cards.filter(c => c.type.toLowerCase().includes("trap"));

// ----------------------
// Write outputs
// ----------------------
fs.writeFileSync("./cards-core.json", JSON.stringify(cardsCore, null, 2));
fs.writeFileSync("./cards-by-id.json", JSON.stringify(cardsById, null, 2));
fs.writeFileSync("./search-index.json", JSON.stringify(searchIndex, null, 2));
fs.writeFileSync("./monsters.json", JSON.stringify(monsters, null, 2));
fs.writeFileSync("./spells.json", JSON.stringify(spells, null, 2));
fs.writeFileSync("./traps.json", JSON.stringify(traps, null, 2));

console.log("✅ Generated:");
console.log("  - cards-core.json");
console.log("  - cards-by-id.json");
console.log("  - search-index.json");
console.log("  - monsters.json");
console.log("  - spells.json");
console.log("  - traps.json");
