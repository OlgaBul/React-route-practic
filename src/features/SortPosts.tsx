import type { ChangeEvent } from "react";


type SortOrder = "asc" | "desc";

interface SortProps {
  currentSort: SortOrder;
  onSortChange: (value: SortOrder) => void;
}

const SortPosts = ({ currentSort, onSortChange }: SortProps) => {
  return (
    <label>
      Сортировка:
      <select
        value={currentSort}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onSortChange(event.target.value as SortOrder)
        }
      >
        <option value='asc'>По возрастанию</option>
        <option value='desc'>По убыванию</option>
      </select>
    </label>
  );
};

export default SortPosts;