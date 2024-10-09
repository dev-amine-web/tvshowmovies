import { memo } from "react";
import { Media, MediaType, Movie, TvShow } from "../types"
import Image from "./Image"

interface Props {
    selectId: (id: number) => void,
    media: Media;
    type: MediaType;
}
const Item: React.FC<Props> = memo(({ media, selectId, type }) => {

    return (
        <div onClick={() => { selectId(media.id) }} className='hover:scale-110 transition-transform duration-300 relative flex flex-col sm:px-6 lg:px-8 py-4 cursor-pointer'>
            <Image alt={type === MediaType.Movie ? (media as Movie).title : (media as TvShow).name} path={media.backdrop_path} />
            <p className='bg-opacity-50 w-full mt-2'>{type === MediaType.Movie ? (media as Movie).title : (media as TvShow).name}</p>

        </div>
    )
})
export default Item;
