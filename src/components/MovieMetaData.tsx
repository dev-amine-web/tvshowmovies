import { memo } from "react";
import { MovieDetails } from "../types";
import Image from "./Image";
import MetaItem  from "./MetaItem";
import useConvertNamesToString from "../hooks/useConvertNamesToString";
import useFormatDate from "../hooks/useFormatDate";
import useFormatOverview from "../hooks/useFormatOverview";


const MovieMetaData: React.FC<{ metaData: MovieDetails }> = memo(({ metaData }) => {
    const genres = useConvertNamesToString(metaData?.genres);
    const productionCountries = useConvertNamesToString(metaData?.production_countries);
    const releaseDate = useFormatDate(metaData?.release_date);
    const overview = useFormatOverview(metaData.overview);
    
    return <div>
    <Image alt={metaData.title} path={metaData.backdrop_path} isRounded={true} />
        <div className='absolute xl:top-[150px] lg:top-[100px] md:top-[75px] sm:top-[50px] top-[25px] ml-4'>
            <h2 className="pb-[30px] text-2xl sm:text-3xl md:text-4xl font-bold 
                ">{metaData.title}</h2>
            {metaData.homepage &&
                <a target="_blank" className="mt-[10px] text-l sm:text-xl md:text-2xl font-bold w-[150px] bg-[#ec3655] border-none py-2 px-4 cursor-pointer text-center" rel="noopener noreferrer" href={metaData.homepage}>
                    Visit a website
                </a>}
        </div>

        <div className="p-6 flex-row relative">

            <div className="">
                <p className="mt-2 text-sm sm:text-lg md:text-xl">{ overview }</p>
                {metaData.release_date && 
                <MetaItem title="Date:" content={releaseDate} />}
                <MetaItem title="Genres:" content={genres} />
                <MetaItem title="Countries:" content={productionCountries} />
                <div>
                </div>
            </div>

        </div>
    </div>;
});

export default MovieMetaData;