import React from "react";
import App from "../../../src/client/components/app";
import {expectToMatchSnapshot} from "../../util";

describe('<App />', () => {
    it('renders correctly', () => {
        expectToMatchSnapshot(<App />);
    })
});