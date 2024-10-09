import { MediaType } from "../types";

export const getMediaTypeString = (type: MediaType): string => {
    switch (type) {
        case MediaType.Movie:
            return 'movie';
        case MediaType.TvShow:
            return 'tvshow';
        default:
            return 'movie';
    }
};

export const getMediaTypeFromString = (value: string): MediaType => {
    switch (value) {
        case 'movie':
            return MediaType.Movie;
        case 'tvshow':
            return MediaType.TvShow;
        default:
            return MediaType.Movie;
    }
};

