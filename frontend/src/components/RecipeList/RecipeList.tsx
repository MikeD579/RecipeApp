import type { RecipeResponse } from '../../api/recipeApi';

interface Props {
  recipes: RecipeResponse[];
}

export const RecipeList = ({ recipes }: Props) => {
  // If the list is empty, React makes it easy to handle with a simple "if"
  if (recipes.length === 0) return <p>No recipes found yet!</p>;

  return (
    <div className="space-y-4 w-full">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="relative w-full border border-neutral-300 rounded-lg shadow-md bg-white" onClick={() => console.log("clicked")}>
          <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded-md" />
          <h3 className="absolute bottom-4 pl-6 pr-2 bg-gray-100/90 text-gray-800 font-bold text-lg">{recipe.name}</h3>
        </div>
      ))}
    </div>
  );
};