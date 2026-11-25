import { NavLink, Outlet } from "react-router";

function NavigationLink() {
  const topics = [
    { to: "jsx", label: "JSX разметка" },
    { to: "components", label: "Components" },
    { to: "props", label: "Props" },
    { to: "state", label: "State и useState" },
    { to: "events", label: "События (Events)" },
    { to: "key", label: "Списки, key, Fragment, refs и StrictMode" },
    { to: "lifecycle", label: "Lifecycle" },
    { to: "effect", label: "useEffect и синхронизация" },
    { to: "virtualdom", label: "Рендер, reconciliation и Virtual DOM" },
    { to: "context", label: "Context" },
    { to: "memo", label: "React.memo, useMemo и useCallback" },
    { to: "route", label: "React Router" },
    { to: "lazy", label: "React.lazy и Suspense" },
    { to: "react-hook-form", label: "Формы и React Hook Form" },
    { to: "ui-libraries", label: "ui.shadcn, Ant Design" },
    { to: "storage", label: "localStorage и sessionStorage" },
    { to: "deploy", label: "Deploy: GitHub Pages и Vercel" },
  ];
  return (
    <div
  style={{
    display: "flex",
    alignItems: "stretch",
    gap: "24px",
    padding: "16px",
    height: "calc(100vh - 86px)",
  }}
>
  <aside
    className="scroll-area"
    style={{
      width: "260px",
      flexShrink: 0,
      overflowY: "auto",
    }}
  >
    <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {topics.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>

  <main
    className="scroll-area"
    style={{ flex: 1, minWidth: 0, overflowY: "auto" }}
  >
    <Outlet />
  </main>
</div>
  );
}

export default NavigationLink;
