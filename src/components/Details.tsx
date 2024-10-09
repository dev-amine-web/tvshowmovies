import { memo } from "react";
import useMediaDetails from "../hooks/useMediaDetails";
import { MediaType } from "../types";
import Loader from './Loader';
import MovieMetaData from './MovieMetaData';
import TvShowMetaData from "./TvShowMetaData";

interface Props {
    id: number,
    closeDetailsPopup: () => void,
    selectedType: MediaType
}
const Details: React.FC<Props> = memo(({ id, closeDetailsPopup, selectedType }) => {

    const { data, isFetching, isError, error } = useMediaDetails(id, selectedType);
    if (isError) {
        return <div className="bg-[#181818]/90 fixed top-0 w-full h-screen overflow-y-auto" data-testid="details" ><div className="mt-[100px]">{error?.message}</div></div>;
    }
    return (<div className="bg-[#181818]/90 fixed top-0 w-full h-screen overflow-y-auto" data-testid="details" >
        {isFetching && <div className="flex items-center justify-center"><Loader /></div>}
        {data && <>
            <div className="relative bg-[#000000] mt-[100px] rounded-3xl 3xl:mx-[35%] 2xl:mx-[32%] xl:mx-[30%] lg:mx-[25%] md:mx-[20%] sm:mx-[15%]" >
                <button onClick={closeDetailsPopup} className="hover:scale-110 transition-transform duration-300 w-[30px] h-[30px] absolute top-0 z-10 right-0 mt-4 mr-4" type="button" id="buttonClose" aria-label="Fermer">
                    <img src="/close.svg" alt="Close" className="w-16 h-16" />
                </button>
                <div>
                    {selectedType === MediaType.Movie ? <MovieMetaData metaData={data} /> : <TvShowMetaData metaData={data} />}
                </div>
            </div>

        </>
        }

    </div>);
});

export default Details;