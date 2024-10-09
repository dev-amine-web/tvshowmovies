import { useInfiniteQuery } from '@tanstack/react-query';
import {  MediaApiResponse, MediaType } from '../types';
import { fetchMedias, searchMedias } from '../api/fetchMedias';


const useMedias = (searchByTitle: string, selectedType: MediaType) => {
  return useInfiniteQuery<MediaApiResponse, Error>({
    queryKey: !searchByTitle ? [selectedType === MediaType.Movie ? "listMovies" : "listTvshows"] : 
    [selectedType === MediaType.Movie ? "movie" : "tvShow", searchByTitle],

    queryFn: !searchByTitle ? ({ pageParam }) => fetchMedias({ pageParam: pageParam as number, selectedType }) :
     ({ pageParam }) => searchMedias({ pageParam: pageParam as number, selectedType, searchByTitle }),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null
    },
    gcTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    staleTime: 10 *  60 * 1000, // 10 minutes in milliseconds

  }
  );
};

export default useMedias;
