import { render, screen } from "@testing-library/react";
import Item from "./Item";
import { MediaType } from "../types";

jest.mock('./Image', () => () => <div data-testid="component-image" />);
describe('Item', () => {
    test('renders Image', () => {
        //we check the image only once because there are no conditions. If it works for MediaType.Movie, it will work for MediaType.TV
        render(<Item media={{}} selectId={() => {}} type={MediaType.Movie} />);
        expect(screen.getByTestId('component-image')).toBeInTheDocument();
    })
    test('renders title in the movie media type', () => {
        //Verify if title is display in item of type MediaType.Movie
        render(<Item media={{title:"Deadpool & Wolverine"}} selectId={() => {}} type={MediaType.Movie} />);
        expect(screen.getByText("Deadpool & Wolverine")).toBeInTheDocument();
    })
    test('renders title in the tvShow media type', () => {
        //Verify if title is display in item of type MediaType.TvShow
        render(<Item media={{name:"House of the Drago"}} selectId={() => {}} type={MediaType.TvShow} />);
        expect(screen.getByText("House of the Drago")).toBeInTheDocument();
    })
});