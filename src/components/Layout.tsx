import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: " 50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          listStyle: "none",
          gap: "55px",
          marginBottom: '40px'
        }}
      >
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
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
