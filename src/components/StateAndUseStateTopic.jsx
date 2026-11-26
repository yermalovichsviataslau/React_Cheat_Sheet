import Advice from "./Advice";
import { CodeBlock } from "./CodeBlock";
import Concept from "./Concept";
import SwitchTopic from "./SwitchTopic";

function StateAndUseStateTopic() {
  return (
    <div>
      <h1>State и useState</h1>
      <p>Видео:</p>
      <a href="https://www.youtube.com/watch?v=Fg668s4bpVQ">
        📦 useState: управление состоянием компонента
      </a>
      <h2>Что такое state</h2>
      <Concept info={"Состояние компонента"}>
        State (состояние) в React — это место, где компонент хранит свои
        динамические данные. Это как записная книжка, которую компонент
        использует для хранения текущего состояния и его изменения.
      </Concept>

      <h3>Чем отличается state от props</h3>
      <ul>
        <li>
          Props передаются компоненту «снаружи», от родителя, и неизменны.
        </li>
        <li>State управляется «внутри» компонента и изменяется.</li>
      </ul>
      <p>
        Пример аналогии: props — это текст в книге, который ты читаешь, а state
        — это твои личные заметки на полях.
      </p>
      <h2>Создание и использование state</h2>
      <h3>Hook useState</h3>
      <p>
        В функциональных компонентах для работы с state используется хук
        useState.
      </p>
      <p>Он возвращает массив из двух элементов:</p>
      <ul>
        <li>state — текущее значение состояния;</li>
        <li>state — текущее значение состояния;</li>
      </ul>
      <p>
        а принимает initialState — начальное значение состояния. Может быть
        примитивным типом данных, объектом или функцией.
      </p>
      <CodeBlock
        code={`import React, { useState } from 'react';

const [state, setState] = useState(initialState);`}
      />
      <CodeBlock
        code={`import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increase</button>
    </div>
  );
}`}
      />
      <p>В этом примере:</p>
      <ul>
        <li>useState(0) устанавливает начальное значение счётчика.</li>
        <li>setCount обновляет значение.</li>
      </ul>
      <p>
        При вызове функции обновления React перерисует компонент с новым
        значением состояния.
      </p>
      <h2>Изменение state</h2>
      <p>State не должен изменяться напрямую.</p>
      <p>
        Если ты попытаешься изменить его напрямую, React не поймёт, что нужно
        обновить интерфейс:
      </p>
      <CodeBlock
        code={`// Неправильно
state.count = 10;`}
      />
      <p>Вместо этого используй setState, чтобы сообщить React об изменении:</p>

      <CodeBlock code={`setState(newValue);`} />
      <h3>setState — асинхронный</h3>
      <p>
        Обновление state происходит асинхронно. Если нужно обновить состояние на
        основе его текущего значения, используй функцию:
      </p>
      <CodeBlock code={`setCount((prevCount) => prevCount + 1);`} />
      <Advice info={"Совет"}>
        <p>Функциональный сеттер</p>
        <p>Этот подход гарантирует, что изменения будут выполнены корректно.</p>
      </Advice>

      <h3>Обрати внимание ещё раз — это важно</h3>
      <p>Функция-setter (например setState) — асинхронная операция!</p>
      <Concept info="Очередь обновлений">
        Когда мы вызываем setState, React не обновляет состояние и не рендерит
        компонент немедленно. Вместо этого он помещает обновление в очередь.
        После этого React применяет все обновления состояния за один раз перед
        следующим рендером компонента.
      </Concept>

      <h3>Пример асинхронного поведения</h3>
      <p>
        Рассмотрим пример, где мы попытаемся обновить состояние несколько раз
        подряд и посмотрим, как React объединяет эти обновления:
      </p>
      <CodeBlock
        code={`import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default Counter;`}
      />
      <p>
        В этом примере, когда нажимаем кнопку, handleIncrement вызывается, и мы
        трижды вызываем setCount(count + 1). Интуитивно может показаться, что
        count должен увеличиться на 3, но это не так. Все три вызова setCount
        объединяются в одно обновление, и в итоге count увеличится только на 1.
      </p>
      <p>
        Чтобы корректно обновить состояние на основе предыдущего значения,
        следует использовать функциональный сеттер:
      </p>
      <CodeBlock
        code={`const handleIncrement = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};`}
      />
      <p>
        В этом случае prevCount будет обновлён каждый раз, и состояние count
        увеличится на 3, как ожидается.
      </p>
      <h3>Важность асинхронного поведения</h3>
      <p>Асинхронное поведение сеттеров в React позволяет:</p>
      <ul>
        <li>
          объединять несколько обновлений состояния в одно, что уменьшает
          количество рендеров и улучшает производительность;
        </li>
        <li>
          гарантировать, что компоненты рендерятся с наиболее актуальным
          состоянием.
        </li>
      </ul>
      <h2>Работа с объектами и массивами в state</h2>
      <h3>Обновление объектов</h3>
      <p>
        Если state содержит объект, обновляй его с помощью оператора spread
        (...):
      </p>
      <CodeBlock
        code={`const [user, setUser] = useState({ name: 'Pavel', age: 27 });

setUser((prevUser) => ({
  ...prevUser,
  age: 28,
}));`}
      />
      <h3>Обновление массивов</h3>
      <p>
        Для обновления массивов тоже используй методы, создающие новый массив:
      </p>
      <CodeBlock
        code={`const [items, setItems] = useState([1, 2, 3]);

setItems((prevItems) => [...prevItems, 4]); // Добавление элемента
setItems((prevItems) => prevItems.filter((item) => item !== 2)); // Удаление элемента`}
      />
      <h2>Состояние и перерисовка</h2>
      <h3>Как state влияет на перерисовку</h3>
      <p>
        Когда state обновляется, React автоматически перерисовывает компонент.
        Это делает работу с интерфейсом более удобной, но может привести к
        лишним обновлениям, если state изменяется слишком часто.
      </p>
      <h3>Оптимизация обновлений</h3>
      <ol>
        <li>Храни минимально необходимое состояние.</li>
        <li>
          Используй мемоизацию (React.memo, useMemo, useCallback) для
          оптимизации.
        </li>
      </ol>
      <h2>Примеры использования state</h2>
      <h3>Счётчик</h3>
      <CodeBlock
        code={`const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
  };

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};`}
      />
      <p>
        Компонент будет отображать текущее значение счетчика, а при нажатии на
        кнопку счетчик будет увеличиваться.
      </p>
      <h2>Управление отображением элементов</h2>
      <CodeBlock
        code={`import React, { useState } from "react";

const Example = () => {
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText((showText) => !showText);
  };

  return (
    <div>
      <button onClick={handleClick}>Показать/скрыть текст</button>
      {showText && <p>Этот текст может быть скрыт или показан</p>}
    </div>
  );
};`}
      />
      <p>
        В этом примере по клику на кнопку вызывается функция handleClick. Она
        вызывает функцию setShowText, которая изменяет текущий state на
        противоположный — это и отвечает за «показать» или «скрыть» текст.
      </p>
      <h3>Управление input-ом</h3>
      <CodeBlock
        code={`import React, { useState } from 'react';

const Example = () => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  }

  return (
    <div>
      <label>
        Введи свое имя:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <p>Привет, {name}!</p>
    </div>
  );
}`}
      />
      <p>
        В этом примере мы создали state с начальным значением пустой строки и
        присвоили его переменной name. В инпуте по событию onChange мы вызываем
        эту функцию, и она меняет пустую строку на те данные, которые ввёл
        пользователь. Да-да, event.target.value — это те данные, которые вводит
        пользователь. Затем мы обратно в input в атрибуте value присваиваем
        значение state.
      </p>
      <h3>Управление стилями</h3>
      <CodeBlock
        code={`import React, { useState } from 'react';

const Example = () => {
  const [color, setColor] = useState('red');

  const handleClick = () => {
    setColor(color === 'red' ? 'blue' : 'red');
  }

  const style = {
    color: color
  };

  return (
    <div>
      <button onClick={handleClick}>Сменить цвет</button>
      <p style={style}>Этот текст может быть красным или синим</p>
    </div>
  );
}`}
      />
      <p>
        В этом примере мы создали state с начальным значением 'red' и присвоили
        его переменной color. Мы также создали функцию handleClick, которая
        вызывается при клике на кнопку и использует функцию setColor для
        изменения значения state. Мы используем объект style для установки цвета
        текста, который зависит от значения state.
      </p>
      <h3>Передача state в дочерние компоненты</h3>
      <Advice info={"Совет"}>
        <p>State уходит вниз через props</p>
        <p>State можно передавать в дочерние компоненты при помощи props.</p>
      </Advice>
      <CodeBlock
        code={`const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count => count + 1);
  };

  return (
    <div>
      <ChildComponent count={count} />
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};

const ChildComponent = ({ count }) => {
  return <p>Счетчик: {count}</p>;
};`}
      />
      <p>
        В данном примере состояние счетчика хранится в родительском компоненте
        ParentComponent, а значение состояния передается в дочерний компонент
        ChildComponent через пропсы.
      </p>
      <h3>State с объектом</h3>
      <p>
        Давай рассмотрим пример использования объекта в качестве состояния. Мы
        создадим компонент, который управляет профилем пользователя с именем,
        возрастом и электронной почтой.
      </p>
      <p>
        Важно помнить, что при обновлении объекта в состоянии нужно создавать
        новый объект вместо изменения существующего, чтобы соблюсти принцип
        неизменяемости.
      </p>
      <CodeBlock
        code={`import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // создаем новый объект с обновленным свойством
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Введите ваше имя"
      />
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Введите ваш возраст"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Введите вашу почту"
      />
      <p>Имя: {user.name}</p>
      <p>Возраст: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;`}
      />
      <p>В этом примере:</p>
      <ol style={{ marginBottom: "10px" }}>
        <li>
          Мы инициализируем стейт user как объект с тремя свойствами: name, age
          и email.
        </li>
        <li>
          Используем функцию handleChange, чтобы обновить состояние при
          изменении любого из полей ввода. Эта функция:
          <ul>
            <li>извлекает name и value из события;</li>
            <li>
              создает новый объект состояния, копируя существующие свойства с
              помощью оператора spread (...prevUser) и обновляя измененное
              свойство.
            </li>
          </ul>
        </li>
        <li>
          Каждый элемент ввода (input) имеет атрибут name, который соответствует
          ключу объекта состояния. Это позволяет использовать один обработчик
          для всех полей ввода.
        </li>
      </ol>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "20px",
        }}
      >
        <SwitchTopic to={"/topic/props"}>переведущая тема: Props</SwitchTopic>
        <SwitchTopic to={"/topic/events"}>следущая тема: Events</SwitchTopic>
      </div>
    </div>
  );
}

export default StateAndUseStateTopic;
