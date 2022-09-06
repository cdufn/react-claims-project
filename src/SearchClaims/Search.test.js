import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Search from "./Search";

describe("search tests", () => {

    test("ensure warning message is not displayed when component first rendered",
        () => {

            //GIVEN
            render(<BrowserRouter><Search /></BrowserRouter>);
            //WHEN
            //nothing happens
            //THEN
            const messageParagraph = screen.queryByText("Please enter a valid order id");
            //we expect the message isn't present
            expect(messageParagraph).not.toBeInTheDocument();
        }
    )

    test("ensure warning message is displayed when the user has only typed in a space",
        () => {

            //GIVEN
            render(<BrowserRouter><SearchClaims /></BrowserRouter>);
            //WHEN
            const orderIdInput = screen.getByLabelText("Claim ID");
            userEvent.type(orderIdInput, " ");

            const submitButton = screen.queryByRole("button");

            //THEN
            const messageParagraph = screen.queryByText("Please enter a valid order id", { exact: true });
            //we expect the message is present
            expect(messageParagraph).toBeInTheDocument();
            expect(orderIdInput).toHaveValue(" ");

        }
    )

})