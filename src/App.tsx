import { useEffect } from "react";
import Home from "./Home";
import ModulePage from "./ModulePage";

function getPage() {
  return new URLSearchParams(window.location.search).get("page") || "home";
}

export default function App() {
  const page = getPage();

  useEffect(() => {
    document.title = page.startsWith("kapitel/")
      ? "Lernkapitel · Physik-Lernlabor"
      : "Physik-Lernlabor · Leistungsfach BW";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  if (page.startsWith("kapitel/")) return <ModulePage slug={page.slice("kapitel/".length)} />;
  return <Home />;
}
