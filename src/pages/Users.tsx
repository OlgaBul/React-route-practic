import { useNavigate } from "react-router-dom";
import useFetch from "../shared/hooks/useFetch";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    error,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

  if (!users) return <div>Нет пользователей</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul style={{ listStyle: "none", paddingLeft: "55px" }}>
        {users?.map((user) => {
          return (
            <li key={user.id} style={{ paddingBottom: "25px" }}>
              {user.name}
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                Посмотреть профиль
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
