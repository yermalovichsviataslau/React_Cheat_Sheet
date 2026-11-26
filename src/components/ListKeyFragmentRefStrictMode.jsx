import Advice from "./Advice";
import { CodeBlock } from "./CodeBlock";
import Concept from "./Concept";
import SwitchTopic from "./SwitchTopic";

function ListKeyFragmentRefStrictMode() {
  return (
    <div>
      <h1>Списки, key, Fragment, refs и StrictMode</h1>
      <p>Видео:</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="https://youtu.be/H7orJ54ogUg?si=jPsJw0TdMMa5GqRF" className="videoLink">
          🧩 React.Fragment и key в списках: как не словить баг при рендере
        </a>
        <a href="https://www.youtube.com/watch?v=yWBceit8jgg" className="videoLink">
          🧷 useRef: работа с DOM и сохранение значений без ререндера
        </a>
      </div>

      <h2>key</h2>
      <Concept info={"Зачем нужен key"}>
        key — это уникальный идентификатор, который React использует для
        определения, какие элементы списка изменились, добавились или удалились.
        Без key React перерисовывает элементы списка неэффективно, что может
        привести к неожиданному поведению и падению производительности.
      </Concept>
      <p>Если не указать ключи, в консоли увидим сообщение:</p>
      <p>
        Warning: Each child in an array or iterator should have a unique "key"
        prop.
      </p>
      <h3>Основные правила использования key</h3>
      <p>Используй уникальные значения</p>
      <p>
        key должен быть уникальным для каждого элемента. Лучше всего
        использовать стабильные идентификаторы, такие как ID из данных. Если нет
        ID, используй библиотеку uuid:
      </p>
      <CodeBlock
        code={`const users = [{ id: 1, name: 'Анна' }, { id: 2, name: 'Павел' }];
return users.map((user) => <div key={user.id}>{user.name}</div>)`}
      />
      <p>Не используй индекс массива</p>
      <p>
        Использование индекса как key может вызвать баги, особенно при изменении
        порядка элементов в списке.
      </p>
      <p>Неправильно:</p>
      <CodeBlock
        code={`items.map((item, index) => <div key={index}>{item}</div>);`}
      />
      <p>Сохраняй стабильность ключей</p>
      <p>
        Убедись, что значение key не меняется между рендерами, иначе React будет
        считать элемент новым и удалять старый.
      </p>
      <p>Пример нестабильного key:</p>
      <p>
        Представим, что у нас есть компонент, отображающий список задач. Мы
        создаём key на основе библиотеки uuid (что нестабильно):
      </p>
      <CodeBlock
        code={`function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={uuidv1()}>{task.name}</li>
      ))}
    </ul>
  );
}`}
      />
      <CodeBlock
        code={`function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={uuidv1()}>{task.name}</li>
      ))}
    </ul>
  );
}`}
      />
      <p>Что здесь пойдёт не так:</p>
      <ul>
        <li>Каждый раз при рендере uuidv1() генерирует новое значение.</li>
        <li>
          React считает, что каждый элемент списка полностью новый, даже если
          данные не изменились.
        </li>
        <li>
          Это приведёт к тому, что React удалит старые DOM-элементы и создаст
          новые, что вызовет потерю состояния (например, фокуса на элементах) и
          сниженную производительность.
        </li>
      </ul>
      <Concept info={"key и reconciliation"}>
        Без key механизм reconciliation сверяет компоненты попарно между текущим
        и новым VDOM. Из-за этого может происходить большое количество лишних
        перерисовок интерфейса, что замедляет работу приложения. Добавляя key,
        мы помогаем механизму reconciliation: с key он сверяет не попарно, а
        ищет компоненты с тем же key (тег / имя компонента при этом учитывается)
        — это уменьшает количество перерисовок интерфейса. Обновлены/добавлены
        будут только те элементы, которые были изменены/не встречались в
        предыдущем дереве.
      </Concept>
      <h2>Лучшие практики</h2>
      <ul>
        <li>
          Используй key только там, где это нужно: React оптимизирует список
          только при наличии key.
        </li>
        <li>
          Не дублируй значения key: два одинаковых key в одном списке приведут к
          ошибкам.
        </li>
        <li>
          Не добавляй key без необходимости: не нужно указывать key для
          элементов, которые не являются частью списка.
        </li>
      </ul>
      <h2>Fragment</h2>
      <p>
        Fragment в React — это вспомогательный компонент, который позволяет
        оборачивать несколько дочерних элементов без добавления лишнего элемента
        в DOM. Это полезно, если тебе нужно вернуть несколько элементов, но ты
        не хочешь создавать дополнительный &lt;div&gt; или другой контейнер.
      </p>
      <h3>Зачем нужен Fragment</h3>
      <ul>
        <li>
          Избегает лишних обёрток в DOM: дополнительные контейнеры могут
          усложнять стилизацию и негативно влиять на производительность.
        </li>
        <li>Улучшает читаемость JSX: код становится проще и понятнее.</li>
      </ul>
      <h3>Как использовать Fragment</h3>
      <p>С помощью тега &lt;React.Fragment&gt;</p>
      <CodeBlock
        code={`function App() {
  return (
    <React.Fragment>
      <h1>Hello Child Component</h1>
      <h1>Hello Child Component</h1>
    </React.Fragment>
  );
}`}
      />
      <p>С помощью короткого синтаксиса (&lt;&gt;)</p>
      <p>
        Существует сокращенная запись (импортировать не нужно). Недостаток
        сокращенной записи: нельзя использовать атрибуты, например id или key:
      </p>
      <CodeBlock
        code={`import React, { Fragment } from 'react';

// так хорошо
const ChildComponent = () => <>
    <h1>Hello Child Component</h1>
    <h1>Hello Child Component</h1>
</>

// так нельзя. Будет ошибка
const ChildComponent = () => < id="child">...</>`}
      />
      <Advice>
        Короткий синтаксис не принимает атрибуты Записать &lt; id="child"
        &gt;...&lt;/&gt; невозможно — сокращённый фрагмент &lt;&gt;...&lt;/&gt;
        не принимает props. Если нужны key или другие атрибуты, используй
        &lt;React.Fragment key="..."&gt;.
      </Advice>
      <h2>Refs</h2>
      <h3>Что такое Refs</h3>
      <p>
        Refs (сокр. от "references") в React позволяют получить доступ к
        DOM-элементам или компонентам напрямую. Это своего рода «обходной путь»,
        который даёт тебе возможность взаимодействовать с элементами вне
        обычного React-потока данных.
      </p>
      <h3>Зачем нужны Refs</h3>
      <p>Refs полезны в следующих случаях:</p>
      <ol>
        <li>
          Доступ к DOM-элементам: например, для управления фокусом, выделением
          текста или выполнения анимаций.
          <CodeBlock
            code={`const inputRef = useRef();

function focusInput() {
  inputRef.current.focus();
}

return (
  <div>
    <input ref={inputRef} type="text" />
    <button onClick={focusInput}>Фокус</button>
  </div>
);`}
          />
        </li>
        <li>
          Работа с внешними библиотеками: например, для интеграции с
          библиотеками, которые манипулируют DOM напрямую (Chart.js, Three.js).
        </li>
      </ol>
      <h3>Почему не стоит злоупотреблять Refs</h3>
      <ol>
        <li>
          Обход React-философии: использование Refs идёт вразрез с основными
          принципами React (однонаправленный поток данных). Если злоупотреблять
          ими, это приведёт к созданию сложного и запутанного кода.
        </li>
        <li>
          Трудности тестирования и поддержки: логика, завязанная на Refs, делает
          код менее предсказуемым и сложным в отладке.
        </li>
        <li>
          Проблемы с производительностью: обращение к DOM через Refs может
          негативно сказаться на производительности, особенно в сложных
          приложениях.
        </li>
      </ol>
      <p>
        Лучше стараться использовать state и props для управления данными и
        поведением, а Refs применять только в исключительных случаях.
      </p>
      <h3>Что такое forwardRef</h3>
      <p>
        forwardRef — это инструмент, который позволяет передавать Ref в дочерний
        компонент. Это полезно, когда тебе нужно получить доступ к DOM-элементу,
        который находится внутри кастомного компонента.
      </p>
      <CodeBlock
        code={`const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function App() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Фокус</button>
    </div>
  );
}`}
      />
      <h3>Использование ref для хранения значений между рендерами</h3>
      <p>
        useRef в React можно использовать не только для работы с DOM, но и для
        хранения данных между рендерами без их повторного вызова.
      </p>
      <p>Когда это полезно:</p>
      <ul>
        <li>хранить предыдущее значение (например, предыдущий стейт);</li>
        <li>сохранять id или другие данные, которые не должны менять UI;</li>
        <li>запоминать количество ререндеров компонента.</li>
      </ul>
      <p>Пример: сохранение предыдущего значения стейта</p>
      <CodeBlock
        code={`import { useRef, useState, useEffect } from "react";

function PreviousStateExample() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(null);

  useEffect(() => {
    prevCount.current = count; // Запоминаем предыдущее значение после рендера
  }, [count]);

  return (
    <div>
      <p>Текущее значение: {count}</p>
      <p>Предыдущее значение: {prevCount.current}</p>
      <button onClick={() => setCount(count => count + 1)}>Увеличить</button>
    </div>
  );
}`}
      />
      <p>Как это работает:</p>
      <ul>
        <li>
          prevCount.current не триггерит ререндер, но сохраняет предыдущее
          значение count;
        </li>
        <li>
          после каждого рендера в useEffect обновляется prevCount.current;
        </li>
        <li>
          это позволяет отслеживать предыдущее состояние без влияния на ререндер
          компонента.
        </li>
      </ul>
      <h3>Когда использовать Refs</h3>
      <ul>
        <li>
          Фокусировка или управление DOM: например, фокус на инпуте после
          загрузки страницы.
        </li>
        <li>
          Реализация пользовательских анимаций: доступ к элементу для прямого
          управления его стилями.
        </li>
        <li>
          Интеграция с внешними библиотеками: например, инициализация стороннего
          плагина для DOM.
        </li>
      </ul>

      <h2>React.StrictMode</h2>
      <p>
        React.StrictMode — это инструмент, встроенный в React, который помогает
        разработчикам выявлять потенциальные проблемы в приложениях. Он
        добавляет дополнительные проверки и предупреждения как для компонентов,
        так и для методов жизненного цикла, что позволяет более надежно
        разрабатывать и поддерживать кодовую базу.
      </p>
      <h3>Основные преимущества React.StrictMod</h3>
      <ul>
        <li>
          Выявление небезопасных методов жизненного цикла: уведомляет о методах,
          которые могут вызвать проблемы в будущем.
        </li>
        <li>
          Предупреждения об использовании устаревших API: помогает обнаружить и
          устранить использование устаревших и небезопасных API.
        </li>
        <li>
          Обнаружение побочных эффектов: помогает находить и устранять ошибки,
          связанные с побочными эффектами в методах жизненного цикла.
        </li>
        <li>
          Улучшение производительности: помогает оптимизировать приложение,
          выявляя потенциальные проблемы с производительностью.
        </li>
      </ul>
      <h3>Как использовать React.StrictMode</h3>
      <p>
        Использование React.StrictMode в приложении достаточно простое. Его
        можно обернуть вокруг всего приложения или вокруг отдельных компонентов.
      </p>
      <p>
        Допустим, у нас есть простой компонент, который мы хотим проверить с
        помощью React.StrictMode:
      </p>
      <CodeBlock
        code={`// MyComponent.js
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted or updated');
    return () => {
      console.log('Component will unmount');
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;`}
      />
      <p>Теперь обернем этот компонент в React.StrictMode:</p>
      <CodeBlock
        code={`// App.js
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <h1>Strict Mode Example</h1>
        <MyComponent />
      </div>
    </React.StrictMode>
  );
};

export default App;`}
      />
      <h3>Какие проблемы выявляет React.StrictMode</h3>
      <ol>
        <li>
          Небезопасные методы жизненного цикла:
          <ul>
            <li>componentWillMount</li>
            <li>componentWillReceiveProps</li>
            <li>componentWillUpdate</li>
          </ul>
          Эти методы считаются устаревшими и небезопасными, так как могут
          привести к ошибкам при асинхронных обновлениях.
        </li>
        <li>
          Побочные эффекты:
          <ul>
            <li>
              в React.StrictMode компоненты могут монтироваться и
              размонтироваться дважды при разработке, что помогает выявить
              побочные эффекты и ошибки.
            </li>
          </ul>
        </li>
        <li>
          Проверка на устаревшие строки контекста:
          <ul>
            <li>
              React.StrictMode предупреждает, если используется устаревший
              контекст API.
            </li>
          </ul>
        </li>
        <li>
          Проверка на неправильное использование findDOMNode:
          <ul>
            <li>
              метод findDOMNode устарел, и его использование может привести к
              проблемам.
            </li>
          </ul>
        </li>
      </ol>
      <Advice info={"Совет"}>
        <p>StrictMode только для разработки</p>
        <p>
          Проверки StrictMode активны только в development-режиме и не попадают
          в production-сборку.
        </p>
      </Advice>

        <p style={{ marginBottom: "10px" }}>
          ссылка на статью:{" "}
          <a href="https://react.dev/reference/react/StrictMode">
            StrictMode – React
          </a>
        </p>


      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <SwitchTopic to={"/topic/events"}>переведущая тема: Events</SwitchTopic>
        <SwitchTopic to={"/topic/lifecycle"}>следущая тема: Lifecycle</SwitchTopic>
      </div>
    </div>
  );
}
export default ListKeyFragmentRefStrictMode;
