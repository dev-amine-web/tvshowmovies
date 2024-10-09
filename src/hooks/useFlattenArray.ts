import { useMemo } from "react";
import { Media } from "../types";
import { InfiniteData } from "@tanstack/query-core";

    

const useFlattenArray = ((data: InfiniteData<any, unknown> | undefined) => {
    const formattedDate = useMemo(() => {
        const itemsArray : Media= [];
        data?.pages.forEach(page => {
          page.results.forEach((item : Media) => itemsArray.push(item));
        });
        return itemsArray;
    }, [data]);

    return formattedDate;
});

export default useFlattenArray;