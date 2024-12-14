import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface CategoryDropdownProps {
  categories: string[];
  onChange: (selected: string[]) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  onChange
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onChange(updatedCategories); // Notify the parent about changes
  };

  return (
    <DropdownMenu  >
      <DropdownMenuTrigger className="w-full rounded-md border p-2 text-left mb-4">
        Select Category
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-64 w-56 overflow-y-auto">
        {categories.map((category) => (
          <DropdownMenuItem key={category} className="flex items-center">
            <Checkbox
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <span className="ml-2">{category}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
