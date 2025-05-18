import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../shared/hooks/useFetch";
import Search from "../features/Search";
import Sort from "../features/Sort";

interface Posts {
  userId: string;
  id: number;
  title: string;
  body: string;
}

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "asc";
  const search = searchParams.get("search") || '';

  const {
    data: posts,
    isLoading,
    error,
  } = useFetch<Posts[]>(`https://jsonplaceholder.typicode.com/posts`, [userId]);

  if (!posts) return <div>Нет постов</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const updateSortParams = (key: string, value: string) => {
    if (value === "asc") {
      searchParams.delete(key);
    } else searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const updateSearchParams = (value: string) => {
    if (value.length < 1) {
      searchParams.delete("search")
    } else searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  const filteredSortedPosts: Posts[] =
    posts
      .filter((post) => post.userId == userId)
      .filter(post => {
        if (search) {
          return post.title.includes(search);
        } return post;
      })
      .sort((a, b) => {
        if (sort === "asc") return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
      }) || [];


  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Search currentSearch={search} onSearchChange={updateSearchParams} />
        <Sort currentSort={sort} onSortChange={updateSortParams} />
      </div>

      <ul style={{ listStyle: "none", paddingLeft: "55px" }}>
        {filteredSortedPosts.map((post) => {
          return (
            <li key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserPosts;
