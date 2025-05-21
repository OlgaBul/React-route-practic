interface SortProps {
  currentSort: string;
  onSortChange: (value: string) => void;
}

const Sort = ({ currentSort, onSortChange }: SortProps) => {
  return (
    <label>
      {" "}
      Сортировка:
      <select
        value={currentSort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </label>
  );
};

export default Sort;
