import React from 'react';

export interface CategoryOption {
  id: string;
  name: string;
  count?: number;
  icon?: string;
}

interface CategorySelectorProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="filter-box category-selector-container">
      <div className="category-header">
        <h5 style={{ margin: 0 }}>Category Filter</h5>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            className="btn-clear-category"
            onClick={() => onSelectCategory('all')}
          >
            Clear (Show All)
          </button>
        )}
      </div>

      <div className="category-radio-group" role="radiogroup" aria-label="Category Selection">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <label
              key={cat.id}
              className={`category-radio-label ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <input
                type="radio"
                name="category-mutual-selection"
                value={cat.id}
                checked={isSelected}
                onChange={() => onSelectCategory(cat.id)}
                className="category-radio-input"
              />
              <span className="category-radio-custom" />
              <span className="category-name">{cat.name}</span>
              {typeof cat.count === 'number' && (
                <span className="category-badge">{cat.count}</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};
