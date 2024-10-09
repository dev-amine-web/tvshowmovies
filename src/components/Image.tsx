import { memo, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
    path: string;
    alt: string;
    isRounded?: boolean;
    isPortrait?: boolean
}

const Image: React.FC<Props> = memo(({ path, isRounded = false, alt, isPortrait = false }) => {
    const [srcImage, setSrcImage] = useState<string>();
    useEffect(()=>{
        setSrcImage(process.env.REACT_APP_CDN_IMAGES + path);

    },[path])
    return (
        <div className="relative  ">
            {/* if I have error in  asset image, I display the default image /default.svg or /default2.svg*/}
            <LazyLoadImage
                src={srcImage}
                className={` ${isRounded ? 'rounded-3xl rounded-b-none' : ''}  w-full h-full bg-white object-cover
                filter brightness-70`}
                alt={alt}
                onError={() => setSrcImage(isPortrait? "/default2.svg" : "/default.svg")}
            />
        </div>
    )
  });


export default Image;

