import { useState } from "react";
import { DefaultLayout } from "./layouts/default";
import { Recipes } from "./features/Recipes";
import { Categories } from "./features/Categories";

type Page = "recipes" | "mealplans";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("recipes");

  return (
    <DefaultLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === "recipes" && <Recipes setCurrentPage={setCurrentPage} />}
      {currentPage === "mealplans" && <Categories setCurrentPage={setCurrentPage} />}
    </DefaultLayout>
  )
}
