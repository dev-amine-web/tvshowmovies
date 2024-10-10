import { Navigation, Pagination } from 'swiper/modules';
import Image from "../components/Image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { TvShowDetails } from "../types";
import MetaItem from './MetaItem';
import { memo } from 'react';
import useConvertNamesToString from '../hooks/useConvertNamesToString';
import useFormatDate from '../hooks/useFormatDate';
import useFormatOverview from '../hooks/useFormatOverview';
import useFilterSeasons from '../hooks/useFilterSeasons';

const TvShowMetaData: React.FC<{ metaData: TvShowDetails }> = memo(({ metaData }) => {
    const createdBy = useConvertNamesToString(metaData?.created_by);
    const genres = useConvertNamesToString(metaData?.genres);
    const productionCountries = useConvertNamesToString(metaData?.production_countries);
    const firstAirDate = useFormatDate(metaData?.first_air_date);
    const overview = useFormatOverview(metaData.overview);
    const seasons = useFilterSeasons(metaData.seasons)
    return <div>
        <Image alt={metaData.name} path={metaData.backdrop_path} isRounded={true} />
        <div className='absolute xl:top-[150px] lg:top-[100px] md:top-[75px] sm:top-[50px] top-[25px] ml-4'>
            <h2 className="pb-[30px] text-2xl sm:text-3xl md:text-4xl font-bold
                ">{metaData.name}</h2>
            {metaData.homepage &&
                <a target="_blank" className="mt-[10px] text-l sm:text-xl md:text-2xl font-bold w-[150px] bg-[#ec3655] border-none py-2 px-4 cursor-pointer text-center" rel="noopener noreferrer" href={metaData.homepage}>
                    Visit a website
                </a>}
        </div>
        <div className="p-6 flex-row relative">
            <div className="">
                <div className="flex items-center space-x-4">
                    <p className="text-gray-400 text-sm sm:text-lg md:text-xl">{ overview}</p>
                </div>
                {metaData.first_air_date && <MetaItem title="Date:" content={firstAirDate} />}
                <MetaItem title="Created By:" content={createdBy} />
                <MetaItem title="Genres:" content={genres} />
                <MetaItem title="Countries:" content={productionCountries} />
            </div>
        </div>

        <div className=' pb-[100px]  justify-center items-center'>
            <Swiper
                className='w-[90%]'
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
            > {seasons.map((season) => <SwiperSlide key={season.id}><Image alt={season.name} isPortrait={true} path={season.poster_path as string} /></SwiperSlide>)}

            </Swiper>
        </div>

    </div>;
});

export default TvShowMetaData;