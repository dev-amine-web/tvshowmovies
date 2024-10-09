export type Media = Show | Movie;
export type MediaDetails = TvShowDetails | MovieDetails;
export type MediaApiResponse = TvShowApiResponse | MoviesApiResponse;
export enum MediaType {
    Movie = 1,
    TvShow = 2
}
interface FetchMediaParams {
    pageParam: number;
    selectedType?: MediaType;
    searchByTitle?: string;
}