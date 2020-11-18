import React from "react";

export default (elements: any, extraProps: any) =>
    React.Children.map(elements, (element) =>
        React.cloneElement(element, extraProps)
    );
