import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import useMedias from '../hooks/useMedias';
import * as router from 'react-router'
import 'intersection-observer';
import { useNavigate } from 'react-router-dom';



jest.mock('../components/Details', () => () => <div data-testid="component-details" />);
// Mock useMedias
jest.mock('../hooks/useMedias');



const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('Details Movie', () => {


  const mockUseMedias = { "pages": [{ "page": 1, "results": [{ "adult": false, "backdrop_path": "/dvBCdCohwWbsP5qAaglOXagDMtk.jpg", "genre_ids": [28, 35, 878], "id": 533535, "original_language": "en", "original_title": "Deadpool & Wolverine", "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.", "popularity": 4898.846, "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", "release_date": "2024-07-24", "title": "Deadpool & Wolverine", "video": false, "vote_average": 7.749, "vote_count": 3847 }], "total_pages": 46359, "total_results": 927174 }], "pageParams": [1] };

  beforeEach(() => {
    (useMedias as jest.Mock).mockReturnValue({
      data: mockUseMedias,
      error: null,
      isFetched: true,
      status: 'success',
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders Details component after click', () => {

    render(<HomePage />);
    // Vérifiez que le composant details n'est pas rendu initialement
    expect(screen.queryByTestId('details')).toBeNull();
    // Simulez un clic sur le bouton
    fireEvent.click(screen.getByText(mockUseMedias.pages[0].results[0].title));
    // Vérifiez que le composant details est rendu après le clic



    expect(screen.getByTestId('component-details')).toBeInTheDocument();

  });

  test('renders and navigates to the correct URL on text change', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: jest.fn(),
    }));
    const navigate = useNavigate();
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Search.../i), { target: { value: 'marvel' } });


    expect(navigate).toHaveBeenCalledWith('/movie/marvel');
  });

  test('renders and navigates to the correct URL on change Type movie or TvShow', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: jest.fn(),
    }));
    const navigate = useNavigate();
    render(<HomePage />);
    //verifié que la valeur par default movie => 1 est selectionnée
    expect(screen.getByRole('combobox')).toHaveValue('1');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(navigate).toHaveBeenCalledWith('/tvshow/');
  });

});

describe('Details Movie Error', () => {
  const mockUseMedias = {
    data: null,
    error: {message:"Failed to fetch"},
    isFetched: true,
    status: 'error',
    fetchNextPage: jest.fn(),
    hasNextPage: true,
  }
  beforeEach(() => {
    (useMedias as jest.Mock).mockReturnValue(mockUseMedias);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders Error', () => {
    render(<HomePage />);
    expect(screen.getByText(mockUseMedias.error.message)).toBeInTheDocument();
  });

});