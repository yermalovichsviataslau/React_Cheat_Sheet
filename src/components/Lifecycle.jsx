import { CodeBlock } from "./CodeBlock";

function Lifecycle() {
  return (
    <div>
      <h1>Lifecycle</h1>
      <h2>Основные этапы жизненного цикла компонента</h2>
      <h3>1. Монтирование (Mounting)</h3>
      <p>Это этап, когда компонент создаётся и вставляется в DOM.</p>
      <p>Основные методы:</p>
      <ul>
        <li>
          constructor: Здесь происходит инициализация состояния и привязка
          методов.
          <CodeBlock
            code={`constructor(props) {
  super(props);
  this.state = { data: null };
}`}
          />
        </li>

        <li>
          {" "}
          render: Метод, который возвращает JSX-разметку. Вызывается при
          создании и обновлении компонента.
        </li>
        <li>
          componentDidMount: Вызывается один раз после того, как компонент
          вставлен в DOM. Отличное место для запросов к серверу, подписки на
          события или установки таймеров.
          <CodeBlock
            code={`componentDidMount() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => this.setState({ data }));
}`}
          />
        </li>
      </ul>

      <h3>2. Обновление (Updating)</h3>
      <p>Компонент может обновляться, когда изменяются его props или state.</p>
      <p>Основные методы: </p>
      <ul>
        <li>
          shouldComponentUpdate: Позволяет контролировать, следует ли
          перерисовывать компонент. Можно использовать для оптимизации
          производительности.
        </li>
        <li>render: Вызывается снова для обновления отображения.</li>
        <li>
          componentDidUpdate: Вызывается сразу после обновления компонента.
          Здесь можно, например, реагировать на изменение данных, выполнять
          дополнительные запросы или работать с изменённым DOM.
          <CodeBlock
            code={`componentDidUpdate(prevProps, prevState) {
  if (prevState.data !== this.state.data) {
    console.log('Данные обновились!');
  }
}`}
          />
        </li>
      </ul>

      <h3>3. Размонтирование (Unmounting)</h3>
      <p>Это момент, когда компонент удаляется из DOM</p>
      <p>Основной метод:</p>
      <ul>
        <li>
          componentWillUnmount: Здесь происходит очистка: отписка от событий,
          остановка таймеров, отмена сетевых запросов. Это помогает избежать
          утечек памяти.
          <CodeBlock
            code={`componentWillUnmount() {
  // Отписываемся от событий, очищаем таймеры и т.д.
  console.log('Компонент удалён');
}`}
          />
        </li>
      </ul>
      <p></p>

      <h3>4. Обработка ошибок (Error Handling)</h3>
      <p>
        Если во время работы компонента происходит ошибка, можно её перехватить
        и обработать.
      </p>
      <p>Методы:</p>
      <ul>
        <li>
          static getDerivedStateFromError(error): Позволяет обновить состояние,
          чтобы отобразить запасной UI при возникновении ошибки.
        </li>
        <li>
          componentDidCatch(error, info): Позволяет записать информацию об
          ошибке или отправить её на сервер для дальнейшего анализа.
        </li>
      </ul>
    </div>
  );
}

export default Lifecycle;
