import { render, screen } from '@testing-library/react';

import 'intersection-observer';
import Details from './Details';
import useMediaDetails from '../hooks/useMediaDetails';
import { MediaType } from '../types';


jest.mock('../hooks/useMediaDetails');
jest.mock('./MovieMetaData', () => () => <div data-testid="component-movieMetaData" />);
jest.mock('./TvShowMetaData', () => () => <div data-testid="component-tvShowMetaData" />);


describe('Details movieMetaData', () => {
    // Mock the return value of useMediaDetails

    const mockMediaDetails = {
        data: {},
        error: null,
        isFetched: true,
        status: 'success',
        fetchNextPage: jest.fn(),
        hasNextPage: true,
    };


    beforeEach(() => {
        (useMediaDetails as jest.Mock).mockReturnValue(mockMediaDetails);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders movieMetaData within Details', () => {
        //Verify that the component Details contains component movieMetaData
        render(<Details id={1} closeDetailsPopup={() => { }} selectedType={MediaType.Movie} />);
        expect(screen.getByTestId('component-movieMetaData')).toBeInTheDocument();

    })

})


describe('Details tvShowMetaData', () => {
    // Mock the return value of useMediaDetails

    const mockMediaDetails = {
        data: {},
        error: null,
        isFetched: true,
        status: 'success',
        fetchNextPage: jest.fn(),
        hasNextPage: true,
    };


    beforeEach(() => {
        (useMediaDetails as jest.Mock).mockReturnValue(mockMediaDetails);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders tvShowMetaData within Details', () => {
        //Verify that the component Details contains component tvShowMetaData
        render(<Details id={1} closeDetailsPopup={() => { }} selectedType={MediaType.TvShow} />);
        expect(screen.getByTestId('component-tvShowMetaData')).toBeInTheDocument();

    })
})
describe('Details movieMetaData Error', () => {
    // Mock the return value of useMediaDetails

    beforeEach(() => {
        (useMediaDetails as jest.Mock).mockReturnValue(mockMediaDetails);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockMediaDetails = {
        data: {},
        isError:true,
        error: {message:"Failed to fetch"},
        isFetched: true,
        status: 'Error',
        fetchNextPage: jest.fn(),
        hasNextPage: true,
    };
    test('renders Error', () => {
        //Verify display error
        render(<Details id={1} closeDetailsPopup={() => { }} selectedType={MediaType.TvShow} />);
        expect(screen.getByText(mockMediaDetails.error.message)).toBeInTheDocument();

    })
})