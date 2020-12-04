import React, {FunctionComponent} from "react";

const BatchedGraphControlBatchControl: FunctionComponent<{}> = () => {
    return (
        <div className="batch-controller">
            <div className="batch-controller-previous">
                Prev
            </div>
            <div className="batch-controller-play">
                Play
            </div>
            <div className="batch-controller-next">
                Next
            </div>
        </div>
    );
}

export default BatchedGraphControlBatchControl;