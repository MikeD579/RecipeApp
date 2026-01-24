import type { RecipeResponse } from "../../../api/recipeApi";

interface RecipeHorizontalListCardProps {
  items: RecipeResponse[];
  height: string;
}

export const RecipeHorizontalListCard = ({ items, height }: RecipeHorizontalListCardProps) => {
  return (
    <div className="absolute -left-6 max-w-screen pl-6 flex items-center overflow-x-scroll scrollbar-hidden overflow-y-hidden">
      {items.map((item) => (
        <div key={item.id} className="mr-4">
          <div className={`w-48 ${height} bg-white rounded-lg flex items-center justify-center`}>
            <div className="w-full border border-neutral-300 rounded-lg shadow-lg bg-white" onClick={() => console.log("clicked", item.id)}>
              <img src={item.imageUrl} alt={item.name} className={`w-full ${height} object-cover rounded-md`} />
              <div className="absolute bottom-4 pl-6 pr-2 bg-gray-100/90 text-gray-800 font-light text-xl">{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}