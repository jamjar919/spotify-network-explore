import React, {FunctionComponent, useEffect, useState} from 'react'
import embedProps from "../util/embedProps";

import "../../../node_modules/react-sigma/sigma/layout.forceAtlas2";

type Props = {
    worker: boolean,
    barnesHutOptimize?: boolean,
    barnesHutTheta?: number,
    adjustSizes?: boolean,
    iterationsPerRender?: number,
    linLogMode: boolean,
    outboundAttractionDistribution?: boolean,
    edgeWeightInfluence?: number,
    scalingRatio?: number,
    strongGravityMode?: boolean,
    slowDown?: number,
    gravity?: number,
    timeout?: number,
    sigma?: Sigma,
};

const stripOptions = (props: Props): Props => {
    return Object.assign({}, props, {
        sigma: undefined,
        children: undefined
    })
};

const CustomForceAtlas2: FunctionComponent<Props> = (props) => {
    const {
        children,
        sigma
    } = props;

    const [running, setRunning] = useState(false);

    // Setup
    useEffect(() => {
        if (sigma && !running) {
            sigma.startForceAtlas2(stripOptions(props));
            setRunning(true);
        }

        // Cleanup
        return () => {
            if (sigma) {
                sigma.killForceAtlas2();
            }
        }
    }, []);

    useEffect(() => {
        if (running && sigma) {
            sigma.killForceAtlas2();
            sigma.startForceAtlas2(stripOptions(props));
        }
    });

    return <div>{ embedProps(children, { sigma }) }</div>;
};

export default CustomForceAtlas2;