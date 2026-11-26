import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ThemeContext from "./components/ThemeContext";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import NavigationLink from "./components/NavigationLink";
import ComponentsTopic from "./components/ComponentsTopic";
import JsxTopic from "./components/JsxTopic";
import PropsTopic from "./components/PropsTopic";
import StateAndUseStateTopic from "./components/StateAndUseStateTopic";
import EventsTopic from "./components/EventsTopic";
import ListKeyFragmentRefStrictMode from "./components/ListKeyFragmentRefStrictMode";
import Lifecycle from "./components/Lifecycle";
import UseEffectTopic from "./components/UseEffectTopic";
import ErrorPage from "./components/ErrorPage";

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
          <Route path="key" element={<ListKeyFragmentRefStrictMode />}/>
          <Route path="lifecycle" element={<Lifecycle />}/>
          <Route path="effect" element={<UseEffectTopic />}/>
          
        </Route>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
