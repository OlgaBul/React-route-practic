import { Link, useParams } from "react-router-dom";
import useFetch from "../shared/hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${userId}`, [
    userId,
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <Link to={`/users/${userId}/posts`}>Посмотреть посты</Link>
    </>
  );
};

export default UserProfile;
