import Input from '../../components/ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}): React.JSX.Element => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Input
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
