import { useMemo } from "react";

const useFormatDate = (date: string): string => {
    const formattedDate = useMemo(() => {
        return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
    }, [date]);

    return formattedDate;
};

export default useFormatDate;