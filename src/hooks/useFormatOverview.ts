import { useMemo } from 'react';

const useFormatOverview = (text: string): string => {
    const formattedOverview = useMemo(() => {
        return text?.length > 200 ? text.substring(0, 200) + '...' : text;
    }, [text]);

    return formattedOverview;
};

export default useFormatOverview;
