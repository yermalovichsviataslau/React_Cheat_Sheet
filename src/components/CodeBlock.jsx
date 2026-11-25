import { useContext } from "react";
import ShikiHighlighter from "react-shiki";
import ThemeContext from "./ThemeContext";

export function CodeBlock({ code, language = "jsx" }) {
  const { theme } = useContext(ThemeContext);

  return (
    <ShikiHighlighter
      language={language}
      theme={theme === "dark" ? "github-dark" : "github-light"}
      addDefaultStyles={false}
      className="my-code-block"
    >
      {code.trim()}
    </ShikiHighlighter>
  );
}
