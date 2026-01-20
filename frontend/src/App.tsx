import { RecipeList } from "./components/RecipeList";

const recipes = [
  { id: '1', title: 'Feta Pasta', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/55e1d74b4853af14f1dc8460962e33791c3ad6e04e507440712b7bd29744c3_640.jpg' },
  { id: '2', title: 'Tostadas', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
  { id: '3', title: 'Avocado Toast', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
  { id: '4', title: 'Chicken Salad', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
  { id: '5', title: 'Pancakes', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/53e6d5474957b10ff3d8992cc12c30771037dbf85254794e72287fd19f4f_640.jpg' },
];

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-start p-6">
      <div>
        <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-800">
          Welcome to Recipe App
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Your ultimate solution for scraping and managing recipes effortlessly.
        </p>
        <RecipeList recipes={recipes} />

        <footer className="mt-12 text-gray-500 text-sm text-center">
          &copy; 2026 Recipe App. All rights reserved.
        </footer>
      </div>
      <div className="fixed w-[calc(100%-2rem)] flex justify-around bottom-4 right-4 p-2 bg-white rounded-full shadow-lg">
        search bar
      </div>
    </div>
  )
}
