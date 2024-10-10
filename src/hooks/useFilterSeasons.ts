import { useMemo } from 'react';
import { Season } from '../types';

const useFilterSeasons = (seasons: Season[]): Season[] => {
    const namesString = useMemo(() => {
      return seasons?.filter(season => season.poster_path !== "")
    }, [seasons]);
  
    return namesString;
  };

export default useFilterSeasons;
