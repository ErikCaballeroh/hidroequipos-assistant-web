import { Icon, Input, Select } from "@/components/ui";

export default function ProductFilters({
  query,
  onQueryChange,
  category,
  categories,
  onCategoryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-6 py-3">
      <div className="relative w-72">
        <Icon
          name="search"
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate"
        />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nombre o SKU..."
          className="pl-9"
        />
      </div>
      <Select
        value={category}
        onChange={(e) => onCategoryChange((e.target as HTMLSelectElement).value)}
      >
        <option>Todas</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
    </div>
  );
}
