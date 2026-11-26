import Advice from "./Advice";
import { CodeBlock } from "./CodeBlock";
import Concept from "./Concept";
import SwitchTopic from "./SwitchTopic";

function EventsTopic() {
  return (
    <div>
      <h1>События (Events)</h1>
      <p>
        В React события (events) являются важной частью взаимодействия с
        пользователем. Они позволяют обрабатывать действия пользователя, такие
        как клики, наведение, отправка формы и другие.
      </p>
      <Concept info={"События — это props"}>
        Вот пять наиболее часто используемых событий в React и примеры их
        применения. Событие передаётся в компонент как обычный prop-обработчик,
        например onClick.
      </Concept>
      <h2>Часто используемые события</h2>
      <h3>onClick (Клик)</h3>
      <p>
        Событие onClick возникает при клике на элементе. Это одно из наиболее
        распространенных событий в React.
      </p>
      <CodeBlock
        code={`const handleClick = () => {
  console.log('Кликнули!');
}

const MyComponent = () => {
  return (
    <button onClick={handleClick}>Нажми меня</button>
  );
}`}
      />
      <h3>onChange (Изменение)</h3>
      <p>
        Событие onChange возникает при изменении значения элемента формы, такого
        как текстовое поле (input), флажок (checkbox) или выбор элемента списка
        (radio).
      </p>
      <Advice info={'Совет'}>
        <p>Объект события</p>
        <p>
          В React параметр event в callback-функции представляет объект события,
          который генерируется при каждом событии. event.target.value содержит
          текущее значение элемента input.
        </p>
      </Advice>
      <h3>onSubmit (Отправка формы)</h3>
      <p>
        Событие onSubmit возникает при отправке формы. Оно позволяет выполнить
        действия, связанные с отправкой данных формы на сервер.
      </p>
      <CodeBlock
        code={`const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Форма отправлена!');
}

const MyComponent = () => {
  return (
    <form onSubmit={handleSubmit}>
      {/* поля формы */}
      <button type="submit">Отправить</button>
    </form>
  );
}`}
      />
      <h3>onMouseOver (Наведение курсора)</h3>
      <p>
        Событие onMouseOver возникает, когда курсор наводится на элемент. Оно
        может использоваться для отображения дополнительной информации или
        изменения состояния компонента при наведении.
      </p>
      <CodeBlock
        code={`const handleMouseOver = () => {
  console.log('Курсор наведен!');
}

const MyComponent = () => {
  return (
    <div onMouseOver={handleMouseOver}>Наведите курсор на меня</div>
  );
}`}
      />
      <h3>onKeyDown (Нажатие клавиши)</h3>
      <p>
        Событие onKeyDown возникает при нажатии клавиши на клавиатуре. Оно
        позволяет реагировать на определенные комбинации клавиш или выполнять
        действия на основе нажатых клавиш.
      </p>
      <CodeBlock
        code={`const handleKeyDown = (event) => {
  console.log('Нажата клавиша:', event.key);
}

const MyComponent = () => {
  return (
    <input type="text" onKeyDown={handleKeyDown} />
  );
}`}
      />
      <h3>Другие события</h3>
      <p>
        Конечно, это только несколько примеров популярных событий в React.
        Существует множество других событий, таких как onFocus, onBlur, onScroll
        и т. д., которые могут быть использованы в зависимости от конкретных
        потребностей твоего приложения.
      </p>

      <h2>target VS currentTarget</h2>
      <p>event.target — элемент, на котором произошло событи</p>
      <p>
        event.currentTarget — элемент, чей обработчик выполняется прямо сейчас.
      </p>
      <p>
        .value — текущее значение соответствующего элемента, если у него есть
        такое свойство. Клик не обязательно меняет это значение.
      </p>
      <p>
        В примере ниже сравниваем id элементов. Используем родительский блок div
        с кнопкой внутри: у обоих элементов один и тот же обработчик. У div нет
        свойства value, поэтому здесь удобнее смотреть на id.
      </p>
      <CodeBlock
        code={`import { useState } from 'react';

const App = () => {
  const [lastClick, setLastClick] = useState({
    target: '',
    currentTarget: '',
  });

  const handleClick = (event) => {
    const values = {
      target: event.target.id,
      currentTarget: event.currentTarget.id,
    };

    console.log(values);
    setLastClick(values);
  };

  return (
    <>
      <div id="parent" onClick={handleClick}>
        Родительский блок
        <button id="child" type="button" onClick={handleClick}>
          Child Button
        </button>
      </div>

      <p>target: {lastClick.target}</p>
      <p>currentTarget: {lastClick.currentTarget}</p>
    </>
  );
};`}
      />
      <p>
        При клике на Child Button обработчик вызывается дважды: сначала на
        кнопке, затем на родительском блоке из-за всплытия события.
      </p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          fontSize: "14px",
          textAlign: "left",
          margin: "10px 0 ",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              Вызов обработчика
            </th>
            <th style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              target.id
            </th>
            <th style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              currentTarget.id
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              На кнопке
            </td>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              child
            </td>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              child
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              На родительском блоке
            </td>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              child
            </td>
            <td style={{ padding: "10px 14px", border: "1px solid #cbd5e1" }}>
              parent
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        target остаётся прежним, а currentTarget указывает на элемент, чей
        обработчик выполняется.
      </p>
      <p>
        Каждый вызов обновляет состояние. На экране остаётся результат
        последнего вызова: target: child, currentTarget: parent. В консоли при
        этом видны оба вызова.
      </p>
      <p>
        При клике по свободной области родительского блока обработчик выполнится
        один раз: оба значения будут parent.
      </p>
      <h2>Доп. методы, которые нужно запомнить</h2>
      <h3>event.preventDefault()</h3>
      <p>
        Этот метод используется для отмены действия по умолчанию, которое должно
        было произойти в ответ на событие. Например, если мы кликаем по ссылке,
        браузер по умолчанию перейдет по указанному в ссылке адресу. Если мы не
        хотим этого, можно использовать preventDefault().
      </p>
      <CodeBlock
        code={`import React, { useState } from 'react';

const MyForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Отменяет отправку формы
    alert(Форма не отправлена. Имя: ${name});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MyForm;`}
      />
      <p>
        Здесь мы отменяем отправку формы при нажатии на кнопку, чтобы обработать
        данные вручную. Это часто используется в валидаторах форм или при
        реализации собственного поведения на основе событий.
      </p>
      <h3>event.stopPropagation()</h3>
      <p>
        Метод stopPropagation() предотвращает дальнейшее распространение события
        по дереву DOM, т.е. оно не будет передаваться вверх или вниз по цепочке
        обработчиков событий.
      </p>
      <p>
        Этот метод полезен, когда нужно предотвратить выполнение обработчиков на
        родительских элементах, но оставить обработку на текущем уровне.
      </p>
      <CodeBlock
        code={`import React from 'react';

const ParentComponent = () => {
  const handleClickParent = () => {
    console.log('Клик по родительскому элементу');
  };

  const handleClickChild = (event) => {
    event.stopPropagation(); // Останавливает всплытие события
    console.log('Клик по дочернему элементу');
  };

  return (
    <div onClick={handleClickParent}>
      Родительский элемент
      <div onClick={handleClickChild}>
        Дочерний элемент
      </div>
    </div>
  );
};

export default ParentComponent;`}
      />
      <p>
        В этом примере при клике на дочерний элемент событие не будет
        передаваться на родительский элемент. То есть сообщение «Клик по
        родительскому элементу» в консоли не появится.
      </p>
      <h3>event.stopImmediatePropagation()</h3>
      <p>
        Этот метод работает похожим образом на stopPropagation(), но с
        дополнительной особенностью. Он не только предотвращает дальнейшее
        распространение события, но и останавливает выполнение других
        обработчиков события на текущем элементе. Это важно, если на одном
        элементе установлено несколько обработчиков для одного события, и ты
        хочешь остановить выполнение всех остальных обработчиков.
      </p>
      <CodeBlock code={`import React from 'react';

const MyButton = () => {
  const handleClickFirst = (event) => {
    event.stopImmediatePropagation(); // Останавливает выполнение других обработчиков
    console.log('Первый обработчик');
  };

  const handleClickSecond = () => {
    console.log('Второй обработчик (не сработает)');
  };

  return (
    <button onClick={(event) => { handleClickFirst(event); handleClickSecond(event); }}>
      Кликни меня
    </button>
  );
};

export default MyButton;`}/>
  <p>Здесь, после того как сработает первый обработчик, событие не будет передано другим обработчикам на том же элементе, и «Второй обработчик» не будет выполнен.</p>
    <Advice info={'Обратите внимание'} >
      <p>Особенность JSX</p>
      <p>В JSX нельзя повесить два атрибута onClick на один элемент — второй просто перезапишет первый. В примере выше оба обработчика вызываются внутри одной функции, поэтому stopImmediatePropagation() демонстрируется именно так: сам приём относится к нативным addEventListener-обработчикам.</p>
    </Advice>
    <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: '20px',
          marginBottom: "20px",
        }}
      >
        <SwitchTopic to={"/topic/state"}>
          переведущая тема: State и useState
        </SwitchTopic>
        <SwitchTopic to={"/topic/key"}>
          следущая тема: Списки, key, Fragment, refs и StrictMode
        </SwitchTopic>
      </div>
    </div>
  );
}

export default EventsTopic;
