import { useQuery } from "@tanstack/react-query";
import { MediaDetails, MediaType } from "../types";
import { fetchMedia } from "../api/fecthMediaDetails";


const useMediaDetails = (id: number,selectedType: MediaType) => {
    return useQuery<MediaDetails, Error>({
        queryKey: [selectedType === MediaType.Movie ? "movieDetails" : "tvShowDetails", id],
        queryFn: () => fetchMedia(id,selectedType),
        gcTime: 60 * 10 * 1000, // 10 minutes in milliseconds
        staleTime: 60 * 10 * 1000, // 10 minutes in milliseconds
    }
    );
};


export default useMediaDetails;