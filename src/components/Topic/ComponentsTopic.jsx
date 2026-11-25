import Advice from "../Advice";
import { CodeBlock } from "../CodeBlock";
import SwitchTopic from "../SwitchTopic";

function ComponentsTopic() {
  return (
    <div>
      <h1>Components</h1>
      <h2>Как создать компонент</h2>
      <p>Название пользовательского компонента начинается с заглавной буквы:</p>

      <CodeBlock
        code={`function Header() {
  return (
    <header>
      <h1>React Homeworks</h1>
    </header>
  )
}`}
      />
      <Advice info={'Совет'}>
        <p>Заглавная буква — не случайность</p>
        <p>{`Запись <header> обозначает встроенный HTML-элемент, а <Header /> — созданный нами React-компонент. Именно регистр первой буквы позволяет React различать их.`}</p>
      </Advice>

      <h2>Как использовать</h2>
      <p>Компонент используется как JSX-тег:</p>
      <CodeBlock code={`<Header />`} />

      <p>Совет</p>
      <CodeBlock
        code={`Заглавная буква — не случайность
Запись <header> обозначает встроенный HTML-элемент, а <Header /> — созданный нами React-компонент.
Именно регистр первой буквы позволяет React различать их.`}
        language="text"
      />

      <h2>Композиция компонентов</h2>
      <p>
        Компоненты можно вкладывать друг в друга и собирать из них страницу:
      </p>
      <CodeBlock
        code={`function Header() {
  return <header>Шапка сайта</header>
}

function MainContent() {
  return <main>Основное содержимое</main>
}

function Footer() {
  return <footer>Подвал сайта</footer>
}

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App`}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <SwitchTopic to={"/topic/jsx"}>
          переведущая тема: JSX разметка
        </SwitchTopic>
        <SwitchTopic to={"/topic/props"}>следущая тема: Props </SwitchTopic>
      </div>
    </div>
  );
}

export default ComponentsTopic;
