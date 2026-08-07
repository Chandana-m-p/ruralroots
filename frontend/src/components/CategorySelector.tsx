import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface CategoryOption {
  id: string;
  name: string;
  count?: number;
  icon?: React.ReactNode;
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
  const { t } = useLanguage();

  const getCategoryTranslation = (id: string, fallbackName: string) => {
    if (id === 'all') return t('allCategories');
    if (id === 'clothing') return 'Clothing & Apparel';
    if (id === 'food') return 'Food & Organic Grocery';
    if (id === 'healthcare') return 'Healthcare & Wellness';
    if (id === 'electronics') return 'Electronics & Smart Tech';
    if (id === 'appliances') return 'Home Appliances & Living';
    if (id === 'pottery') return t('potteryCategory');
    if (id === 'baskets') return t('basketsCategory');
    if (id === 'wood') return t('woodCategory');
    if (id === 'bamboo') return t('bambooCategory');
    if (id === 'jewelry') return t('jewelryCategory');
    if (id === 'decor') return t('decorCategory');
    return fallbackName;
  };

  return (
    <div className="filter-box category-selector-container">
      <div className="category-header">
        <h5 style={{ margin: 0 }}>{t('categoryFilter')}</h5>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            className="btn-clear-category"
            onClick={() => onSelectCategory('all')}
          >
            Clear ({t('allCategories')})
          </button>
        )}
      </div>

      <div className="category-radio-group" role="radiogroup" aria-label="Category Selection">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const localizedCatName = getCategoryTranslation(cat.id, cat.name);
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
              {cat.icon && (
                <span className="category-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                  {cat.icon}
                </span>
              )}
              <span className="category-name">{localizedCatName}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
