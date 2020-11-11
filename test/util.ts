import renderer from 'react-test-renderer';
import {ReactElement} from "react";

export const expectToMatchSnapshot = (component: ReactElement) => {
    const instance = renderer.create(component);
    expect(instance.toJSON()).toMatchSnapshot();
};
