import Advice from "./Advice";
import { CodeBlock } from "./CodeBlock";
import Concept from "./Concept";

function UseEffectTopic() {
  return (
    <div>
      <h1>useEffect и Жизненный цикл функциональных компонентов</h1>
      <Concept>
        useEffect - это хук в React, предназначенный для работы с методами
        жизненного цикла в функциональных компонентах. По сути вот ОДИН ТАКОЙ
        ХУК заменяет ОСНОВНЫЕ методы жизненного цикла.
      </Concept>
      <ul>
        <li>
          Первый параметр: Функция, которая должна выполниться при монтировании
          компонента и при каждом обновлении.
        </li>
        <li>
          Второй параметр: Массив зависимостей определяет, на что конкретно
          должен реагировать useEffect. Если массив пуст, useEffect выполняется
          только при монтировании и размонтировании. Если в массиве указаны
          определенные значения, то useEffect будет выполняться только тогда,
          когда эти значения изменяются.
        </li>
      </ul>
      <CodeBlock
        code={`// Отработает как componentDidMount
useEffect(() => { console.log("componentDidMount") }, [])

// Отработает как componentDidUpdate (но есть прикол. Покажу ниже)
useEffect(() => { console.log("componentDidUpdate") }, [dependency])

// Отработает как componentDidMount и componentDidUpdate
useEffect(() => { console.log("componentDidMount и componentDidUpdate") })

 // Отработает как componentWillUnmount
useEffect(() => {
  return () => console.log('componentWillUnmount')
}, [])`}
      />
      <ol>
        <li>Mounting (Монтирование):</li>
        <ul>
          <li>
            useEffect(() =&gt; {}, []): Заменяет componentDidMount(). Выполняет
            побочные эффекты только один раз после монтирования. Передавая
            пустой массив зависимостей [], можно сделать хук useEffect аналогом
            componentDidMount.
          </li>
        </ul>
        <li>
          Updating (Обновление):
          <ul>
            <li>
              useEffect(() =&gt; {}, [dependency]): Заменяет
              componentDidUpdate(). Позволяет указать зависимость для выполнения
              функции только при изменении определенных props или state. Что
              передашь, за тем и будет следить 🤔 и при изменении вызовет
              функцию.
            </li>
            <li>
              useEffect(() =&gt; {}): Выполняет функцию после каждого рендеринга
              компонента. Отрабатывает как componentDidMount() и
              componentDidUpdate()
              <CodeBlock
                code={`// Отработает как componentDidUpdate (но есть прикол. Покажу ниже)
useEffect(() => { console.log("componentDidUpdate") }, [dependency])`}
              />
            </li>
          </ul>
        </li>
        <li>
          Unmounting (Размонтирование):
          <ul>
            <li>
              useEffect(() =&gt; () =&gt; {}): Заменяет componentWillUnmount().
              Выполняет очистку и отписку от побочных эффектов при
              размонтировании (удалении из DOM) компонента.
            </li>
          </ul>
        </li>
      </ol>
      <p>В теории это важно понимать, но лучше на примерах. Вот они 👇🏻</p>
      <CodeBlock
        code={`import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Компонент был монтирован');
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []); // Пустой массив зависимостей и возвращает функцию,
					// а значит выполнится только при монтировании и размонтировании

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Увеличить</button>
    </div>
  );
}

export default Example;`}
      />
      <p>
        В этом примере useEffect выполняется при монтировании компонента и
        возвращает функцию, которая будет выполнена при размонтировании. Так как
        второй параметр useEffect - это пустой массив зависимостей [], он не
        будет срабатывать при обновлении состояний.
      </p>
      <CodeBlock
        code={`import React, { useState, useEffect } from "react";

const Example = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(\`Счетчик изменен на: \${count}\`);
  }, [count]); // Зависимость [count] - выполнится при изменении состояния count

  return (
    <div>
      <p>{message}</p>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Увеличить</button>
    </div>
  );
};

export default Example;`}
      />
      <p>
        В этом примере useEffect выполняется при изменении значения count, так
        как count является зависимостью, переданной в массиве [count]. Когда
        count изменяется, useEffect обновляет состояние message, отображая новое
        сообщение о счетчике.
      </p>
      <h2>Обратить внимание</h2>
      <p>
        Давай рассмотрим пример компонента, в котором используется хук useEffect
        для эмуляции поведения метода жизненного цикла componentDidUpdate. В
        этом примере useEffect будет вызываться каждый раз, когда изменяется
        значение зависимости dependency.
      </p>
      <CodeBlock
        code={`import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [dependency, setDependency] = useState(0);

  // useEffect будет вызван каждый раз при изменении зависимости \`dependency\`
  useEffect(() => {
    console.log('componentDidUpdate');
  }, [dependency]);

  return (
    <div>
      <p>Dependency value: {dependency}</p>
      <button onClick={() => setDependency(dependency + 1)}>
        Increment Dependency
      </button>
    </div>
  );
};

export default MyComponent;`}
      />
      <p>
        НО! Если мы откроем консоль и посмотрим, то увидим, что
        console.log('componentDidUpdate') будет и при первом рендере…
      </p>
      <p>Почему так??? Должно же быть только при изменении dependency.</p>
      <p>
        В React хуки, такие как useEffect, выполняются при каждом рендере
        компонента, включая первый рендер после монтирования. Это особенность
        работы хуков, и они не повторяют точно поведение метода жизненного цикла
        componentDidMount из классовых компонентов.
      </p>
      <Advice info={'Обратите внимание'}>
        💡 Таким образом, при первом рендере компонента useEffect также будет
        вызван, даже если он имеет зависимость и при этом первоначальное
        значение зависимости не изменилось. Это не является ошибкой, а
        предполагаемое поведение хуков.
      </Advice>
    </div>
  );
}

export default UseEffectTopic;
