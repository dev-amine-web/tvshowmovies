export interface MoviesApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
}



export interface MovieDetails extends Movie {
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
}


