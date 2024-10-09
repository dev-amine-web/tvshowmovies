import { useMemo } from 'react';

const useConvertNamesToString = (datas: { name: string }[]): string => {
    const namesString = useMemo(() => {
      return datas?.map((data) => data.name).join(', ');
    }, [datas]);
  
    return namesString;
  };

export default useConvertNamesToString;