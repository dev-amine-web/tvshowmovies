import { ChangeEvent, useCallback, useEffect, useState, useTransition } from 'react';
import useMedias from '../hooks/useMedias';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Media, MediaType } from '../types';
import Item from '../components/Item';
import Loader from '../components/Loader';
import Details from '../components/Details';
import { getMediaTypeFromString, getMediaTypeString } from '../utils/formatMediaType';
import useFlattenArray from '../hooks/useFlattenArray';


export default function HomePage() {
    const { type, search } = useParams();
    const [searchText, setSearchText] = useState<string>(search ?? '');
    const [selectedType, setSelectedType] = useState<MediaType>(getMediaTypeFromString(type as string));
    const { data, error, status, fetchNextPage, hasNextPage, isFetching, isFetched } = useMedias(searchText, selectedType);
    const [idShowDetails, setIdShowDetails] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();



    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    const selectId = useCallback((id: number) => {
        setIdShowDetails(id);
    }, [])

    const closeDetailsPopup = useCallback(() => {
        setIdShowDetails(0);
    }, []);

    const handleChangeType = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        startTransition(() => {
            setSelectedType(Number(event.target.value) as MediaType);
        })
    }, []);

    const handleChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            startTransition(() => {
        setSearchText(event.target.value);
        })
    }, []);

    useEffect(() => {
        navigate('/' + getMediaTypeString(selectedType) + "/" + searchText);
    }, [selectedType, searchText, navigate])

    useEffect(() => {
        if (idShowDetails) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [idShowDetails])

    useEffect(() => {
        if (inView && isFetched) {
            startTransition(() => {
                fetchNextPage();
            })
        }
    }, [fetchNextPage, inView, isFetched]);

    const allItems = useFlattenArray(data);


    if (status === "error") {
        return <div className='min-h-screen bg-[#181818] text-white'><div>{error?.message}</div></div>;
    }

    return (
        <div className='min-h-screen bg-[#181818] text-white'>
            <Navbar handleChangeType={handleChangeType} searchText={searchText} selectedType={selectedType} handleChangeText={handleChangeText} isDisabled={idShowDetails> 0 ? true : false} />

            <div className='flex items-center justify-center  px-4 sm:px-6 lg:px-8  pt-[100px]'>
                <div className='relative'>
                  
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-2'>

                            {allItems?.map((item: Media, index:number) => (
                                //I can't use id in key because when we paginate we have duplication Item in API
                                <Item key={index} media={item} selectId={selectId} type={selectedType} />
                            ))}
                        </div>
                    
                </div>

            </div>

            {idShowDetails !== 0 && <Details id={idShowDetails} closeDetailsPopup={closeDetailsPopup} selectedType={selectedType} />}
            <div ref={ref} className="flex items-center justify-center">
                {(hasNextPage || isPending || isFetching) && <Loader />
                }
            </div>
        </div>
    );
}