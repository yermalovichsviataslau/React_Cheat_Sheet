import { CodeBlock } from "./CodeBlock";
import Concept from "./Concept";
import SwitchTopic from "./SwitchTopic";

function JsxTopic() {
  return (
    <div>
      <h1>JSX Разметка</h1>

      <h2>Что такое JSX</h2>
      <Concept>
        JSX — синтаксис, похожий на HTML, который можно писать внутри
        JavaScript. Фигурные скобки позволяют вставить JavaScript-выражение в
        разметку.
      </Concept>
      <CodeBlock
        code={`const pageTitle = 'Мой первый React-проект'

function App() {
return <h1>{pageTitle}</h1>
}`}
      />

      <h2>Основные правила JSX</h2>
      <h3>Один корневой элемент</h3>
      <p>Компонент должен вернуть один общий элемент:</p>
      <CodeBlock
        code={`function App() {
  return (
    <main>
      <h1>Заголовок</h1>
      <p>Описание страницы</p>
    </main>
  )
}`}
      />

      <h3>Все теги нужно закрывать</h3>
      <CodeBlock
        code={`<img src="/logo.svg" alt="Логотип" />
<input type="text" />`}
      />

      <h3>Вместо class используется className</h3>
      <CodeBlock code={`<section className="about">О проекте</section>`} />

      <h3>JavaScript записывается в фигурных скобках</h3>
      <CodeBlock
        code={`const courseName = 'React'

function App() {
  return <h1>Курс: {courseName}</h1>
}`}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <SwitchTopic></SwitchTopic>
        <SwitchTopic to={"/topic/components"}>
          следущая тема: components
        </SwitchTopic>
      </div>
    </div>
  );
}

export default JsxTopic;
