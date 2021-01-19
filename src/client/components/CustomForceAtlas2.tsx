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
    sigma?: Sigma,
    stopSimulation?: boolean,
    startingIterations?: number
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
        sigma,
        stopSimulation
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
        if (sigma) {
            if (stopSimulation) {
                sigma.killForceAtlas2();
            } else if (running) {
                // Restart to pick up changes to nodes
                sigma.killForceAtlas2();
                sigma.startForceAtlas2(stripOptions(props));
            }
        }
    });

    return <div>{ embedProps(children, { sigma }) }</div>;
};

export default CustomForceAtlas2;