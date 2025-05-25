interface Posts {
  userId: string;
  id: number;
  title: string;
  body: string;
}

function useFilteredSortedPosts(
  userId: string | undefined,
  posts: Posts[] | null,
  validatedSearch: string,
  validatedSort: string
) {
  if (!posts) return [];

  return posts
    .filter((post) => post.userId == userId)
    .filter((post) => {
      if (validatedSearch) {
        return post.title.toLowerCase().includes(validatedSearch.toLowerCase());
      }
      return post;
    })
    .sort((a, b) => {
      if (validatedSort === "desc") return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
}

export default useFilteredSortedPosts;
