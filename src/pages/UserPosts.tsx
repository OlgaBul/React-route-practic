import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../shared/hooks/useFetch";
import { useMemo } from "react";
import Pagination from "../features/pagination/Pagination";
import { POSTS_PER_PAGE } from "../shared/constants/constants";
import usePagination from "../shared/hooks/usePagination";
import useValidateQueryParams from "../shared/hooks/useValidateQueryParams";
import SearchPosts from "../features/SearchPosts";
import SortPosts from "../features/SortPosts";
import useFilteredSortedPosts from "../shared/hooks/useFilteredSortedPosts";

interface Posts {
  userId: string;
  id: number;
  title: string;
  body: string;
}

type SortOrder = "asc" | "desc";

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    sort: validatedSort,
    page: validatedPage,
    limit: validatedLimit,
    search: validatedSearch,
  } = useValidateQueryParams({
    defaultSort: "asc",
    defaultPage: 1,
    defaultLimit: POSTS_PER_PAGE,
    totalPages: 0,
  });

  const {
    data: posts,
    isLoading,
    error,
  } = useFetch<Posts[]>(`https://jsonplaceholder.typicode.com/posts`, [userId]);


  const filteredSortedPosts: Posts[] = useMemo(() => {
    return  useFilteredSortedPosts(
      userId,
      posts,
      validatedSearch,
      validatedSort
    )
  }, [userId, posts, validatedSearch, validatedSort]);

  const totalPages = Math.ceil(filteredSortedPosts.length / validatedLimit);

  const {
    currentPage,
    handlePageClick,
    handlePreviousPageClick,
    handleNextPageClick,
  } = usePagination({
    initialPage: validatedPage,
    onPageChange: (newPage) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("_page", `${newPage}`);
      newParams.set("_limit", `${POSTS_PER_PAGE}`);
      setSearchParams(newParams);
    },
  });

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * validatedLimit;
    const end = currentPage * validatedLimit;
    return filteredSortedPosts.slice(start, end);
  }, [filteredSortedPosts, currentPage, validatedLimit]);

  const updateUrlParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    setSearchParams(newParams);
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
        <SearchPosts
          currentSearch={validatedSearch}
          onSearchChange={(value: string) =>
            updateUrlParams({ search: value, _page: "1" })
          }
        />
        <SortPosts
          currentSort={validatedSort as SortOrder}
          onSortChange={(value: string) =>
            updateUrlParams({ sort: value, _page: "1" })
          }
        />
        <button
          onClick={() =>
            updateUrlParams({
              _page: "1",
              _limit: `${POSTS_PER_PAGE}`,
              search: "",
              sort: "",
            })
          }
        >
          Сбросить фильтры
        </button>
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
