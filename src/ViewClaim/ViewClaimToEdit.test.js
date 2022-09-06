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

    test("ensure warning message is displayed claim status is Rejected",
        () => {

            //GIVEN
            render(<BrowserRouter><viewClaimToEdit /></BrowserRouter>);
            //WHEN
            const orderIdInput = screen.getByLabelText("Claim Status");
            userEvent.type(orderIdInput, "Rejected");

            const submitButton = screen.queryByRole("button");

            //THEN
            const messageParagraph = screen.queryByText("Claim can not be edited due to status being either Rejected for Accpeted and Paid", { exact: true });
            //we expect the message is present
            expect(messageParagraph).toBeInTheDocument();
            expect(orderIdInput).toHaveValue("Assessed");

        }
    )
})