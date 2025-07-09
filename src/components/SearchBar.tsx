import { useState, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value); // Debounced in parent
  };

  return (
    <div className="mb-4">
      <input
        aria-label="Search for a movie"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search movies..."
        className="w-full p-2 border border-gray-300 rounded shadow"
      />
    </div>
  );
};

export default SearchBar;
