export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface TvShowDetails extends TvShow {
    created_by: CreatedBy[];
    episode_run_time: number[];
    genres: Genre[];
    homepage: string;
    languages: string[];
    number_of_episodes: number;
    number_of_seasons: number;
    original_name: string;
    production_countries: ProductionCountry[];
    seasons: Season[];
    type: string;
}


export interface TvShow {
    backdrop_path: string;
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    name: string;
}
export interface TvShowApiResponse {
    page: number;
    results: TvShow[];
    total_pages: number;
    total_results: number;
}