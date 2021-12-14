import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "../pages/DashboardPage";

describe("DashboardPage Tests", () => {
    test("renders 'Itinerary Planner'", () => {
        render(<DashboardPage/> );

        const textElement = screen.getByText("Itinerary Planner", {exact: false})
        expect(textElement).toBeInTheDocument;

    });

    // example
    test("renders 'After button click' when button is clicked", () => {
        render(<DashboardPage/>);

        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);

        const original = screen.getByText("days in", {exact: false});
        expect(original).toBeInTheDocument;

        const afterClick = screen.queryByText("original text", {exact: false});
        expect(afterClick).not.toBeInTheDocument;
    })

    // example
    test("renders items if request succeeds", async () => {
        // mock
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: "880", name: "Whatever"}]
        })

        render(<DashboardPage/>);

        const listElement = await screen.findAllByRole("listitem");
        expect(listElement).not.toHaveLength(0);
    })
});