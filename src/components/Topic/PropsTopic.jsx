import Advice from "../Advice";
import { CodeBlock } from "../CodeBlock";
import Concept from "../Concept";
import SwitchTopic from "../SwitchTopic";

function PropsTopic() {
  return (
    <div>
      <h1>Props</h1>
      <Concept info={"Props — это аргументы функции"}>
        До этого компоненты отображали только текст, записанный прямо внутри
        них. Props позволяют родительскому компоненту передать дочернему данные
        и сделать его переиспользуемым.
      </Concept>

      <CodeBlock
        code={`Props — это аргументы функции Props похожи на аргументы обычной
JavaScript-функции: родитель передаёт значения, а компонент использует
их при отображении.`}
        language="text"
      />

      <h2>Передача props</h2>
      <p>Данные передаются компоненту как атрибуты JSX:</p>
      <CodeBlock
        code={`function App() {
  return <Greeting name="Павел" />
}`}
      />
      <p>Компонент получает один объект props:</p>
      <CodeBlock
        code={`function Greeting(props) {
  return <h1>Привет, {props.name}!</h1>
}`}
        language="jsx"
      />

      <h2>Деструктуризация</h2>
      <p>Свойства можно получить сразу в параметрах функции:</p>
      <CodeBlock
        code={`function Profile({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  )
}`}
      />
      <p>Использование:</p>
      <CodeBlock
        code={`<Profile name="Анна" role="Дизайнер" />
<Profile name="Максим" role="Разработчик" />`}
      />
      <p>Один компонент отображает разные данные без дублирования разметки.</p>

      <h2>
        Один компонент отображает разные данные без дублирования разметки.
      </h2>
      <p>Строку можно передать в кавычках:</p>
      <CodeBlock code={`<Profile name="Анна" />`} />
      <p>
        Числа, boolean и JavaScript-выражения передаются в фигурных скобках:
      </p>
      <CodeBlock code={`<Profile experience={3} isAvailable={true} />`} />
      <p>Объект тоже можно передать через props:</p>
      <CodeBlock code={`<Profile experience={3} isAvailable={true} />`} />
      <p>Чтение объекта:</p>
      <CodeBlock
        code={`function Profile({ location }) {
  return (
    <p>
      {location.city}, {location.country}
    </p>
  )
}`}
      />

      <h2>Условное отображение boolean-пропа</h2>
      <p>Boolean-значение удобно использовать в условии:</p>
      <CodeBlock
        code={`function StatusBadge({ isAvailable }) {
  return (
    <span>{isAvailable ? 'Доступен для проекта' : 'Сейчас занят'}</span>
  )
}`}
      />
      <p>
        Здесь компонент только выбирает, какой текст показать. Он не изменяет
        полученное значение.
      </p>

      <h2>Передача props дальше</h2>
      <p>
        Компонент может получить данные от родителя и передать их своему
        дочернему компоненту:
      </p>
      <CodeBlock
        code={`function UserCard({ name, isAvailable }) {
  return (
    <article>
      <h2>{name}</h2>
      <StatusBadge isAvailable={isAvailable} />
    </article>
  )
}`}
      />
      
      <Advice info={'Совет'}>
          Поток данных
Данные идут только сверху вниз: App → UserCard → StatusBadge.
      </Advice>


      <h2>children</h2>
      <p>
        children — специальный prop с содержимым, вложенным между открывающим и
        закрывающим тегами компонента:
      </p>
      <CodeBlock
        code={`function Card({ children }) {
  return <article className="card">{children}</article>
}`}
      />
      <p>Использование:</p>
      <CodeBlock
        code={`<Card>
  <h2>Заголовок карточки</h2>
  <p>Содержимое карточки</p>
</Card>`}
      />

      <h2>Props нельзя изменять</h2>
      <p>
        Обратите внимание Props только для чтения Компонент должен читать props,
        но не изменять их:
      </p>
      <CodeBlock
        code={`function Greeting({ name }) {
  // name = 'Другое имя' — так делать не нужно
  return <h1>Привет, {name}!</h1>
}`}
      />
      <p>
        Если интерфейсу понадобятся изменяемые данные, позже для этого будет
        изучен state.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <SwitchTopic to={"/topic/jsx"}>
          переведущая тема: Components
        </SwitchTopic>
        <SwitchTopic to={"/topic/props"}>
          следущая тема: State и UseState{" "}
        </SwitchTopic>
      </div>
    </div>
  );
}

export default PropsTopic;
