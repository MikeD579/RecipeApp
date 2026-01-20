interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  recipes: Recipe[];
}

export const RecipeList = ({ recipes }: Props) => {
  // If the list is empty, React makes it easy to handle with a simple "if"
  if (recipes.length === 0) return <p>No recipes found yet!</p>;

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-2" />
          <h3 className="font-bold text-lg">{recipe.title}</h3>
          <button className="text-blue-500 text-sm mt-2 hover:underline">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};