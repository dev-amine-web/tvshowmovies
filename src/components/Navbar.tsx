import { ChangeEvent, memo } from 'react';
import { MediaType } from '../types';

interface Props {
    selectedType: MediaType,
    searchText: string,
    isDisabled: boolean,
    handleChangeType: (event: ChangeEvent<HTMLSelectElement>) => void,
    handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void
}

const Navbar: React.FC<Props> = memo(({ selectedType, searchText,isDisabled, handleChangeType, handleChangeText }) => {
    return (
        <div className="flex items-center space-x-4  bg-[#000] fixed z-10 w-full">
            <img className="w-16 h-16" src="/logo.svg" alt="TvShowsMovies" />
            <input type="text" placeholder="Search..." className="w-[100px] sm:w-[110px] md:w-[120px] lg:w-[150px] xl:w-[200px] 2xl:w-[250px] text-black focus:bg-blue-100 transition-colors duration-300 ease-in-out" value={searchText} onChange={handleChangeText} disabled={isDisabled}  />
            <select value={selectedType} onChange={handleChangeType} className="p-2 border rounded text-black" disabled={isDisabled} >
                <option value={MediaType.Movie}>Movie</option>
                <option value={MediaType.TvShow}>Tv Show</option>
            </select>
        </div>
    )
});

export default Navbar;
