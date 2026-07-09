import { NavLink } from 'react-router';
import type { RecipeResponse } from '../../../api/recipeApi';
import { Loading } from '../../Base/Loading';

interface Props {
  recipes: RecipeResponse[];
  isLoading: boolean;
  className?: string;
  onClick?: () => void;
}

export const RecipeList = ({ recipes, isLoading, className, onClick }: Props) => {
  if (isLoading) return <Loading />;
  if (!recipes?.length) return; //todo: fix this for search <div className="text-center text-gray-500">No recipes found.</div>;

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {recipes.map((recipe) => (
        <NavLink to={`/recipe/${recipe.id}`} key={recipe.id}>
          <div className="relative w-full border border-neutral-300 rounded-lg shadow-md bg-white" onClick={onClick}>
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md" />
            <h3 className="absolute bottom-4 pl-6 pr-2 bg-gray-100/90 text-gray-800 font-bold text-2xl">{recipe.title}</h3>
          </div>
        </NavLink>
      ))}
    </div>
  );
};