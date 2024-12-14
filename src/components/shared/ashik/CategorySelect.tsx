import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
  children?: Category[];
}

interface CategorySelectProps {
  categories: Category[];
  onChange: (selected: string[]) => void;
}

export function CategorySelect({ categories, onChange }: CategorySelectProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  React.useEffect(() => {
    onChange(selectedCategories);
  }, [selectedCategories, onChange]);

  const renderCategories = (categories: Category[]) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <div className="flex items-center gap-2 px-2 py-1">
          <Checkbox
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => handleCategoryToggle(category.id)}
          />
          <span>{category.name}</span>
        </div>
        {category.children && (
          <div className="pl-4">{renderCategories(category.children)}</div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue
          placeholder={
            selectedCategories.length > 0
              ? `${selectedCategories.length} selected`
              : "Select categories"
          }
        />
      </SelectTrigger>
      <SelectContent className="max-h-64 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {renderCategories(categories)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
