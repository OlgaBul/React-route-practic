import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../shared/hooks/useFetch";
import Search from "../features/Search";
import Sort from "../features/Sort";
import { useMemo } from "react";
import Pagination from "../features/pagination/Pagination";
import { POSTS_PER_PAGE } from "../shared/constants/constants";
import usePagination from "../shared/hooks/usePagination";

interface Posts {
  userId: string;
  id: number;
  title: string;
  body: string;
}

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  let sort = searchParams.get("sort") || "asc";
  let search = searchParams.get("search") || "";
  let page = parseInt(searchParams.get("_page") || "1");

  const {
    data: posts,
    isLoading,
    error,
  } = useFetch<Posts[]>(`https://jsonplaceholder.typicode.com/posts`, [userId]);

  const filteredSortedPosts: Posts[] = useMemo(() => {
    if (!posts) return [];

    return posts
      .filter((post) => post.userId == userId)
      .filter((post) => {
        if (search) {
          return post.title.toLowerCase().includes(search.toLowerCase());
        }
        return post;
      })
      .sort((a, b) => {
        if (sort === "desc") return b.title.localeCompare(a.title);
        return a.title.localeCompare(b.title);
      });
  }, [posts, userId, search, sort]);

  const totalPages = Math.ceil(filteredSortedPosts.length / POSTS_PER_PAGE);

  const {
    currentPage,
    handlePageClick,
    handlePreviousPageClick,
    handleNextPageClick,
  } = usePagination({
    initialPage: page,
    onPageChange: (newPage) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("_page", newPage.toString());
      setSearchParams(newParams);
    },
  });

  const currentPosts = filteredSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const updateUrlParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  const updateSearchParams = (value: string) => {
    updateUrlParams({ search: value, _page: "1" });
  };

  const updateSortParams = (value: string) => {
    updateUrlParams({ sort: value, _page: "1" });
  };
  const resetFilters = () => {
    updateUrlParams({
      search: "",
      sort: "",
    });
  };


  if (!posts) return <div>Нет постов</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Search currentSearch={search} onSearchChange={updateSearchParams} />
        <Sort currentSort={sort} onSortChange={updateSortParams} />
        <button onClick={resetFilters}>Сбросить фильтры</button>
      </div>
      {totalPages > 1 ? (
        <Pagination
          top
          bottom
          totalPages={totalPages}
          currentPage={currentPage}
          handlePreviousPage={handlePreviousPageClick}
          handleNextPage={handleNextPageClick}
          handlePageClick={handlePageClick}
        >
          <ul style={{ listStyle: "none", paddingLeft: "55px" }}>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => {
                return (
                  <li key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                  </li>
                );
              })
            ) : (
              <p>
                <b
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "40px",
                  }}
                >
                  Посты не найдены
                </b>
              </p>
            )}
          </ul>
        </Pagination>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: "55px" }}>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => {
              return (
                <li key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </li>
              );
            })
          ) : (
            <p>
              <b
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "40px",
                }}
              >
                Посты не найдены, совсем не найдены
              </b>
            </p>
          )}
        </ul>
      )}
    </>
  );
};

export default UserPosts;
