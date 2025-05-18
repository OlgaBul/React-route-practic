import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import debounce from "lodash.debounce";

interface SearchProps {
  currentSearch: string;
  onSearchChange(value: string): void;
}

function Search({ currentSearch = "", onSearchChange }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(currentSearch);

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 250),
    [onSearchChange]
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  useEffect(() => {
    if (currentSearch != inputValue) setInputValue(currentSearch);
  }, [currentSearch]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={onChangeInput}
      />
    </div>
  );
}

export default Search;
