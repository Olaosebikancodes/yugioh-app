import ReactDOM from "react-dom/client";
import CardSearch from "./components/search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center p-4">
        Yu-Gi-Oh! Card Search
      </h1>
      <CardSearch />
    </div>
  );
}

export default App;
