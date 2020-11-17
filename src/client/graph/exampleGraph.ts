import {getRandomInt, getRandomPosition, randomisePosition} from "./positionUtil";

export const getExampleGraph = (): SigmaGraph => {

    const positions: any = {
        "1": getRandomPosition(),
        "2": getRandomPosition(),
        "3": getRandomPosition()
    };
    const highDegNodes = [
        { id: "1", size: 20, label: "1", ...positions["1"]},
        { id: "2", size: 20, label: "2", ...positions["2"] },
        { id: "3", size: 20, label: "3", ...positions["3"] }
    ];
    const nodes: SigmaNode[] = Object.assign([], highDegNodes);
    const edges: SigmaEdge[] = [];

    for(let i = 0; i < 50; i += 1) {
        const id = (i + 4) + '';
        const node = { id, size: 1, label: id, x: 0, y: 0 };

        const target = (getRandomInt(3) + 1) + '';
        edges.push({
            id: `${id}:${target}:${i}`,
            source: id,
            target,
        });

        const nodePos = randomisePosition(positions[target]);
        node.x = nodePos.x;
        node.y = nodePos.y;
        nodes.push(node);

        if (Math.random() < .1) {
            const target2 = (getRandomInt(3) + 1) + '';
            edges.push({
                id: `${id}:${target2}:${i}:2`,
                source: id,
                target: target2,
            });
        }
    }

    return {
        nodes,
        edges
    }
};
