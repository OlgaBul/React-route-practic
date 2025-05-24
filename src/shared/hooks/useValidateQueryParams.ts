import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { POSTS_PER_PAGE } from '../constants/constants';

interface UseValidateQueryParamsOptions {
  defaultSort?: "asc" | "desc";
  defaultPage?: number;
  defaultLimit?: number;
  totalPages?: number;
}

const useValidateQueryParams = (options: UseValidateQueryParamsOptions = {
}) => {
  const {
    defaultSort = 'asc',
    defaultPage = 1,
    defaultLimit = POSTS_PER_PAGE,
    totalPages = Infinity,
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get('sort');
    const page = searchParams.get('_page');
    const limit = searchParams.get('_limit');
    let shouldUpdate = false;
    const newParams = new URLSearchParams(searchParams);

    if (!sort || !['asc', 'desc'].includes(sort)) {
      newParams.set('sort', defaultSort);
      shouldUpdate = true;
    }

    const pageNum = parseInt(page || '');
    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      newParams.set('_page', `${defaultPage}`);
      shouldUpdate = true;
    }

    const limitNum = parseInt(limit || '');
    if (isNaN(limitNum) || limitNum !== defaultLimit) {
      newParams.set('_limit', `${defaultLimit}`);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams, defaultSort, defaultPage, defaultLimit]);


  return {
    sort: searchParams.get('sort') || defaultSort,
    page: parseInt(searchParams.get('_page') || `${defaultPage}`),
    limit: parseInt(searchParams.get('_limit') || `${defaultLimit}`),
    search: searchParams.get("search") || ""
  };
};

export default useValidateQueryParams;