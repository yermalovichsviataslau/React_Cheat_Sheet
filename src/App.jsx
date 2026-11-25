import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ThemeContext from "./components/ThemeContext";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import NavigationLink from "./components/NavigationLink";
import ComponentsTopic from "./components/Topic/ComponentsTopic";
import JsxTopic from "./components/Topic/JsxTopic";
import PropsTopic from "./components/Topic/PropsTopic";
import StateAndUseStateTopic from "./components/Topic/StateAndUseStateTopic";
import EventsTopic from "./components/Topic/EventsTopic";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic" element={<NavigationLink />}>
          <Route index element={<JsxTopic />} />
          <Route path="jsx" element={<JsxTopic />} />
          <Route path="components" element={<ComponentsTopic />} />
          <Route path="props" element={<PropsTopic />} />
          <Route path="state" element={<StateAndUseStateTopic />} />
          <Route path="events" element={<EventsTopic />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
