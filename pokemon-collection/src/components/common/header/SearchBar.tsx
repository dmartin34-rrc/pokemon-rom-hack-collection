interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ 
    value, 
    onChange, 
    placeholder = "Search..." 
}: SearchBarProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          className="w-full border border-slate-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;