import { useState, useEffect } from "react";

const getFileName = (query) => {
  const firstChar = query.charAt(0).toUpperCase();
  if (/[0-9]/.test(firstChar)) {
    return "0-9.json";
  } else if (/[A-Z]/.test(firstChar)) {
    return `${firstChar}.json`;
  } else {
    return "0-9.json"; // fallback
  }
};

export default function CardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fileName = getFileName(query);

    if (!cards[fileName]) {
      setLoading(true);
      fetch(`/data/${fileName}`)
        .then((res) => {
          if (!res.ok) throw new Error("File not found");
          return res.json();
        })
        .then((data) => {
          setCards((prev) => ({ ...prev, [fileName]: data }));
        })
        .catch((err) => {
          console.error("Error loading file:", fileName, err);
          setCards((prev) => ({ ...prev, [fileName]: [] }));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query, cards]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fileName = getFileName(query);
    const fileCards = cards[fileName] || [];

    const filtered = fileCards.filter((card) =>
      card.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, cards]);

  return (
    <div className="p-6">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search for a card..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <div className="mt-4 text-blue-500 animate-pulse">Loading...</div>
      )}

      <div className="mt-4 space-y-2">
        {results.map((card) => (
          <div
            key={card.id}
            className="p-3 border rounded shadow hover:bg-gray-50 transition"
          >
            <h2 className="font-bold">{card.name}</h2>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}

        {!loading && !results.length && query && (
          <p className="text-gray-500 italic">No cards found...</p>
        )}
      </div>
    </div>
  );
}
