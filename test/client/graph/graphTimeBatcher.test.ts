import moment from "moment";
import {graphTimeBatcher} from "../../../src/client/graph/graphTimeBatcher";

const DAY_AND_A_BIT_MS = 86400000 + 10000;

const commonNodeProps = { id: "a", label: "a" }; // usually these would vary but we don't mind
const commonEdgeProps = { id: "a:b", source: "a", target: "b" };

// Nodes
const NODE_NO_TIME = { ...commonNodeProps };
const NODE_JAN_6 = { timeAdded: DAY_AND_A_BIT_MS*5, ...commonNodeProps };
const NODE_JAN_10 = { timeAdded: DAY_AND_A_BIT_MS*9, ...commonNodeProps };
const NODE_JAN_6_PLUS = { timeAdded: DAY_AND_A_BIT_MS*5 + 100, ...commonNodeProps };
const NODE_JAN_5 = { timeAdded: DAY_AND_A_BIT_MS*4, ...commonNodeProps };

// Edges
const EDGE_JAN_4 = { timeAdded: DAY_AND_A_BIT_MS*3, ...commonEdgeProps }
const EDGE_JAN_2 = { timeAdded: DAY_AND_A_BIT_MS, ...commonEdgeProps }
const EDGE_JAN_2_PLUS = { timeAdded: DAY_AND_A_BIT_MS + 300, ...commonEdgeProps }
const EDGE_JAN_5 = { timeAdded: DAY_AND_A_BIT_MS*4, ...commonEdgeProps }
const EDGE_JAN_2_DOUBLEPLUS = { timeAdded: DAY_AND_A_BIT_MS + 400, ...commonEdgeProps }

// Graph
const testGraph: SigmaGraph = {
    nodes: [
        NODE_NO_TIME,
        NODE_JAN_6,
        NODE_JAN_10,
        NODE_JAN_6_PLUS,
        NODE_JAN_5
    ],
    edges: [
        EDGE_JAN_4,
        EDGE_JAN_2,
        EDGE_JAN_2_PLUS,
        EDGE_JAN_5,
        EDGE_JAN_2_DOUBLEPLUS
    ]
};

describe('graphTimeBatcher', () => {
    beforeAll(() => {
        moment().utc();
    });

   it('Correctly sorts and batches a graph by time period', () => {
        const output = graphTimeBatcher(testGraph);

       expect(output).toEqual([
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-01 00:00:00", "1970-01-02 00:00:00"],
               graph: {
                   nodes: [],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               graph: {
                   nodes: [NODE_NO_TIME],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-02 00:00:00", "1970-01-03 00:00:00"],
               graph: {
                   nodes: [],
                   edges: [EDGE_JAN_2, EDGE_JAN_2_PLUS, EDGE_JAN_2_DOUBLEPLUS]
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-03 00:00:00", "1970-01-04 00:00:00"],
               graph: {
                   nodes: [],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-04 00:00:00", "1970-01-05 00:00:00"],
               graph: {
                   nodes: [],
                   edges: [EDGE_JAN_4]
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-05 00:00:00", "1970-01-06 00:00:00"],
               graph: {
                   nodes: [NODE_JAN_5],
                   edges: [EDGE_JAN_5]
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-06 00:00:00", "1970-01-07 00:00:00"],
               graph: {
                   nodes: [NODE_JAN_6, NODE_JAN_6_PLUS],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-07 00:00:00", "1970-01-08 00:00:00"],
               graph: {
                   nodes: [],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-08 00:00:00", "1970-01-09 00:00:00"],
               graph: {
                   nodes: [],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-09 00:00:00", "1970-01-10 00:00:00"],
               graph: {
                   nodes: [],
                   edges: []
               }
           },
           {
               timeRange: jasmine.anything(),
               parsedTimeRange: ["1970-01-10 00:00:00", "1970-01-11 00:00:00"],
               graph: {
                   nodes: [NODE_JAN_10],
                   edges: []
               }
           }
       ])
   });

    it('Correctly sorts and batches a graph by time period when empty units are removed', () => {
        const output = graphTimeBatcher(testGraph, { removeEmpty: true });

        expect(output).toEqual([
            {
                timeRange: jasmine.anything(),
                graph: {
                    nodes: [NODE_NO_TIME],
                    edges: []
                }
            },
            {
                timeRange: jasmine.anything(),
                parsedTimeRange: ["1970-01-02 00:00:00", "1970-01-03 00:00:00"],
                graph: {
                    nodes: [],
                    edges: [EDGE_JAN_2, EDGE_JAN_2_PLUS, EDGE_JAN_2_DOUBLEPLUS]
                }
            },
            {
                timeRange: jasmine.anything(),
                parsedTimeRange: ["1970-01-04 00:00:00", "1970-01-05 00:00:00"],
                graph: {
                    nodes: [],
                    edges: [EDGE_JAN_4]
                }
            },
            {
                timeRange: jasmine.anything(),
                parsedTimeRange: ["1970-01-05 00:00:00", "1970-01-06 00:00:00"],
                graph: {
                    nodes: [NODE_JAN_5],
                    edges: [EDGE_JAN_5]
                }
            },
            {
                timeRange: jasmine.anything(),
                parsedTimeRange: ["1970-01-06 00:00:00", "1970-01-07 00:00:00"],
                graph: {
                    nodes: [NODE_JAN_6, NODE_JAN_6_PLUS],
                    edges: []
                }
            },
            {
                timeRange: jasmine.anything(),
                parsedTimeRange: ["1970-01-10 00:00:00", "1970-01-11 00:00:00"],
                graph: {
                    nodes: [NODE_JAN_10],
                    edges: []
                }
            }
        ])
    })

});