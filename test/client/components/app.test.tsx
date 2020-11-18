import React from "react";
import App from "../../../src/client/components/App";
import {expectToMatchSnapshot} from "../../util";

describe('<App />', () => {
    it('renders correctly', () => {
        expectToMatchSnapshot(<App />);
    })
});