import { render, renderHook, screen } from "@testing-library/react";
import TvShowMetaData from "./TvShowMetaData";
import useConvertNamesToString from "../hooks/useConvertNamesToString";
import useFormatDate from "../hooks/useFormatDate";
import useFormatOverview from "../hooks/useFormatOverview";


jest.mock('swiper/react', () => ({
    Swiper: ({ children }: any) => children,
    SwiperSlide: ({ children }: any) => children,
}));

jest.mock('swiper/modules', () => ({
    Navigation: jest.fn(),
    Pagination: jest.fn(),
}));
describe('Details TvShow', () => {
    // Mock the return value of useMediaDetails

    const metaData = {
        "adult": false,
        "backdrop_path": "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
        "created_by": [
            {
                "id": 237053,
                "credit_id": "5db8d867a1d3320011e7ddf1",
                "name": "George R. R. Martin",
                "original_name": "George R. R. Martin",
                "gender": 2,
                "profile_path": "/1A7W0L9dZz0rCN1oj6h8YUvusdN.jpg"
            },
            {
                "id": 1167458,
                "credit_id": "5db8d8fe3faba000163a83cb",
                "name": "Ryan Condal",
                "original_name": "Ryan Condal",
                "gender": 2,
                "profile_path": "/1TGRIEArYHB7TD40HHYiRkwTHLX.jpg"
            }
        ],
        "episode_run_time": [],
        "first_air_date": "2022-08-21",
        "genres": [
            {
                "id": 10765,
                "name": "Sci-Fi & Fantasy"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10759,
                "name": "Action & Adventure"
            }
        ],
        "homepage": "https://www.hbo.com/house-of-the-dragon",
        "id": 94997,
        "in_production": true,
        "languages": [
            "en"
        ],
        "last_air_date": "2024-08-04",
        "name": "House of the Dragon",
        "next_episode_to_air": null,
        "number_of_episodes": 18,
        "number_of_seasons": 2,
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_name": "House of the Dragon",
        "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
        "popularity": 434.689,
        "poster_path": "/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "seasons": [
            {
                "air_date": "2022-08-21",
                "episode_count": 53,
                "id": 309556,
                "name": "Specials",
                "overview": "",
                "poster_path": "/qVU4112Ob2ikHBu4VRC50MdWZcM.jpg",
                "season_number": 0,
                "vote_average": 0.0
            }
        ],
        "type": "Scripted"
    };


    test('renders overview', () => {
        render(<TvShowMetaData metaData={metaData} />);
        const { result } = renderHook(() => useFormatOverview(metaData.overview));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });

    test('renders date', () => {

        render(<TvShowMetaData metaData={metaData} />);
        expect(screen.getByText('Date:')).toBeInTheDocument();
        const { result } = renderHook(() => useFormatDate(metaData.first_air_date));
        expect(screen.getByText(result.current)).toBeInTheDocument();

    });
    test('renders created by', () => {
        render(<TvShowMetaData metaData={metaData} />);
        expect(screen.getByText('Created By:')).toBeInTheDocument();
        const { result } = renderHook(() => useConvertNamesToString(metaData.created_by));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });
    test('renders genres', () => {
        render(<TvShowMetaData metaData={metaData} />);
        expect(screen.getByText('Genres:')).toBeInTheDocument();

        const { result } = renderHook(() => useConvertNamesToString(metaData.genres));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });
    test('renders country', () => {
        render(<TvShowMetaData metaData={metaData} />);
        expect(screen.getByText('Countries:')).toBeInTheDocument();
        const { result } = renderHook(() => useConvertNamesToString(metaData.production_countries));
        expect(screen.getByText(result.current)).toBeInTheDocument();
    });
    test('renders ImageSwiper', () => {
        render(<TvShowMetaData metaData={metaData}/>);
        expect(screen.getByAltText(metaData.seasons[0].name)).toBeInTheDocument();
    })
});