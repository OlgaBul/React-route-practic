import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Страница не найдена! 	&#129488;</h1>
      <Link to={`/`}>Вернуться на главную страницу</Link>
    </div>
  );
};

export default NotFound;
