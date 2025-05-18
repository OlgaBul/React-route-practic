import type { ChangeEvent } from "react";

interface SortProps {
  currentSort: string;
  onSortChange: (key: string, value: string) => void;
}

const Sort = ({ currentSort, onSortChange }: SortProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange("sort", event.target.value);
  };

  return (
    <label>
      {" "}
      Сортировка:
      <select value={currentSort} onChange={handleChange}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </label>
  );
};

export default Sort;
