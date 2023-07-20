import { logRoles, render, screen } from "@testing-library/react";
import SingleChat from "../components/SingleChat";
import { messages } from "./messageData.js"
test('Rate Limit Test', () => {
    render(<SingleChat />)

    logRoles(screen.getByTestId("rootdiv"));

})