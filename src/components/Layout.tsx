import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent:"center", listStyle: "none", gap: "55px" }}>
        <li>
          {/* <NavLink to="/">Главная</NavLink> */}
          <Link to="/">Главная</Link>
        </li>

        <li>
          {/* <NavLink to="/users">Список пользователей</NavLink> */}
          <Link to="/users">Список пользователей</Link>
        </li>
      </nav>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
