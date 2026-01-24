import type { RecipeResponse } from '../../api/recipeApi';

interface HorizontalListProps<T extends RecipeResponse> {
  title: string;
  items: T[];
  onMore: () => void;
}

export const HorizontalList = <T extends RecipeResponse>({ title, items, onMore }: HorizontalListProps<T>) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-gray-600 text-sm select-none hover:text-gray-800" onClick={onMore}>More</div>
      </div>
      <div className="h-[1px] border-b border-gray-300 mb-4"></div>
      <div className="flex w-full h-32 min-w-0 overflow-x-auto scrollbar-hidden pb-2">
        {items.map((item, index) => (
          <div key={index} className="mr-4">
            <div className="border w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}