
interface CategoryItem {
  name: string;
}

interface CategoryHorizontalListCardProps {
  items: CategoryItem[];
  height: string;
}

export const CategoryHorizontalListCard = ({ items, height }: CategoryHorizontalListCardProps) => {
  return (
    <div className="absolute -left-6 max-w-screen pl-6 flex items-center overflow-x-scroll scrollbar-hidden">
      {items.map((item, index) => (
        <div key={index} className="mr-4">
          <div className={`border w-48 ${height} bg-gray-200 rounded-lg flex items-center justify-center`}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}