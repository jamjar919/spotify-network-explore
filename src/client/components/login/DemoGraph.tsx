import React, {FunctionComponent} from "react";
import {Sigma, ForceAtlas2} from "react-sigma";
import GraphLoader from "../GraphLoader";
import {demoGraph} from './demo';
import {graphSettings} from "../../graph/graphSettings";

export const DemoGraph: FunctionComponent<{}> = () => (
    <Sigma
        renderer="webgl"
        style={{
            height: "100%"
        }}
        settings={{
            ...graphSettings,
            defaultLabelColor: "#000",
            defaultLabelBGColor: "#f2f2f2",
        }}
    >
        <GraphLoader graph={demoGraph}>
            <ForceAtlas2
                slowDown={2}
                iterationsPerRender={1}
                barnesHutOptimize
                barnesHutTheta={1}
                linLogMode={true}
                gravity={0.1}
                timeout={20000}
                worker
            />
        </GraphLoader>
    </Sigma>
);