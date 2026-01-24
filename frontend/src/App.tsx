import { useState } from "react";
import { DefaultLayout } from "./layouts/default";
import { Home } from "./features/Home";
import { Recipes } from "./features/Recipes";
import { Categories } from "./features/Categories";

type Page = "home" | "recipes" | "categories";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <DefaultLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === "recipes" && <Recipes setCurrentPage={setCurrentPage} />}
      {currentPage === "categories" && <Categories setCurrentPage={setCurrentPage} />}
    </DefaultLayout>
  )
}
