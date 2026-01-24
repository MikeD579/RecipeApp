import { useState, useEffect } from "react";
import { categoryApi, type CategoryResponse } from "../../api/categoryApi";
import { Loading } from "../../components/Base/Loading";

type Page = "home" | "recipes" | "categories";

interface Props {
  setCurrentPage: (page: Page) => void;
}

export const Categories = ({ setCurrentPage }: Props) => {
  const [categoryList, setCategoryList] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await categoryApi.list();
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div>
        <div><h1 className="text-5xl font-extrabold italic mt-16 mb-2 text-gray-800">Categories</h1></div>
        <div className="border-b border-gray-300 mb-6 h-1 w-full"></div>
      </div>
      <div className="space-y-4 w-full">
        {isLoading && <Loading />}
        {categoryList.map((category) => (
          <div key={category.id} className="relative w-full border border-neutral-300 rounded-lg shadow-md bg-white" onClick={() => console.log("clicked")}>
            <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="absolute bottom-4 pl-6 pr-2 bg-gray-100/90 text-gray-800 font-bold text-2xl">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}