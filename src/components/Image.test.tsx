import { render, screen } from "@testing-library/react";
import Image from "./Image";

test('renders movieMetaData in Details component', () => {
    //verify if image displayed
    render(<Image path="" isRounded={true} alt="image" />);
    expect(screen.getByAltText("image")).toBeInTheDocument();
})