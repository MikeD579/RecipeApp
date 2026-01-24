import type { RecipeResponse } from '../../api/recipeApi';
import { Loading } from '../Loading';

interface Props {
  recipes: RecipeResponse[];
  isLoading: boolean;
}

export const RecipeList = ({ recipes, isLoading }: Props) => {
  if (isLoading) return <Loading />;
  if (recipes.length === 0) return <p>No recipes found yet!</p>;

  return (
    <div className="space-y-4 w-full">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="relative w-full border border-neutral-300 rounded-lg shadow-md bg-white" onClick={() => console.log("clicked")}>
          <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover rounded-md" />
          <h3 className="absolute bottom-4 pl-6 pr-2 bg-gray-100/90 text-gray-800 font-bold text-2xl">{recipe.name}</h3>
        </div>
      ))}
    </div>
  );
};