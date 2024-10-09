import { render, renderHook, screen } from "@testing-library/react";
import MovieMetaData from "./MovieMetaData";
import useConvertNamesToString from "../hooks/useConvertNamesToString";
import useFormatDate from "../hooks/useFormatDate";
import useFormatOverview from "../hooks/useFormatOverview";

describe('Movie meta data', () => {
    // Mock the return value of useMediaDetails

    const metaData = {
        "adult": false,
        "backdrop_path": "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
        "budget": 200000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            }
        ],
        "homepage": "https://www.marvel.com/movies/deadpool-and-wolverine",
        "id": 533535,
        "imdb_id": "tt6263850",
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_title": "Deadpool & Wolverine",
        "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
        "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2024-07-24",
        "revenue": 1326387384,
        "runtime": 128,
        "status": "Released",
        "tagline": "Come together.",
        "title": "Deadpool & Wolverine"
    };


    test('renders overview', () => {
        //verify if overview displayed
        render(<MovieMetaData metaData={metaData} />);
        const { result } = renderHook(() => useFormatOverview(metaData.overview));
        expect(screen.getByText(result.current)).toBeInTheDocument();

    });

    test('renders date', () => {
        //verify if date displayed
        render(<MovieMetaData metaData={metaData} />);

        expect(screen.getByText('Date:')).toBeInTheDocument();
        const { result } = renderHook(() => useFormatDate(metaData.release_date));
        expect(screen.getByText(result.current)).toBeInTheDocument();

    });

    test('renders genres', () => {
        //verify if genres displayed
        render(<MovieMetaData metaData={metaData} />);
        expect(screen.getByText('Genres:')).toBeInTheDocument();
        const { result } = renderHook(() => useConvertNamesToString(metaData.genres));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });
    test('renders Countres', () => {
        //verify if genres countres
        render(<MovieMetaData metaData={metaData} />);
        expect(screen.getByText('Countries:')).toBeInTheDocument();
        const { result } = renderHook(() => useConvertNamesToString(metaData.production_countries));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });

});