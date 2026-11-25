import { NavLink } from "react-router";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Шпаргалка по React</h1>
      <NavLink to="/topic/jsx" className='link'>К ТЕМАМ</NavLink>
    </div>
  );
}

export default Home;
