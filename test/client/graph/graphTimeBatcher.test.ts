import moment from "moment";
import {graphTimeBatcher, TimeBatchedGraph} from "../../../src/client/graph/graphTimeBatcher";
moment.locale('en_gb');

const DAY_AND_A_BIT_MS = 8.64e+7 + 10000;

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

const mapToReadableOutput = (input: TimeBatchedGraph): any => {
    const mappedOutput: any = {};

    Object.entries(input)
        .map(([key, value]) => ({
            days: moment(parseInt(key)).calendar(),
            value
        }))
        .forEach(({ days, value }) => {
            mappedOutput[days] = value;
        });

    return mappedOutput;
};

describe('graphTimeBatcher', () => {
   it('Correctly sorts and batches a graph by time period', () => {
        const output = graphTimeBatcher(testGraph);
        const mappedOutput = mapToReadableOutput(output);

       expect(mappedOutput).toStrictEqual({
           "01/01/1970": {
               nodes: [NODE_NO_TIME],
               edges: []
           },
           "02/01/1970": {
               nodes:[],
               edges:[]
           },
           "03/01/1970":{
               nodes:[],
               edges:[EDGE_JAN_2, EDGE_JAN_2_PLUS, EDGE_JAN_2_DOUBLEPLUS]
           },
           "04/01/1970":{
               nodes:[],
               edges:[]
           },
           "05/01/1970":{
               nodes:[],
               edges:[EDGE_JAN_4]
           },
           "06/01/1970":{
               nodes:[NODE_JAN_5],
               edges:[EDGE_JAN_5]
           },
           "07/01/1970":{
               nodes:[NODE_JAN_6, NODE_JAN_6_PLUS],
               edges:[]
           },
           "08/01/1970":{
               nodes:[],
               edges:[]
           },
           "09/01/1970":{
               nodes:[],
               edges:[]
           },
           "10/01/1970":{
               nodes:[],
               edges:[]
           },
           "11/01/1970":{
               nodes:[NODE_JAN_10],
               edges:[]
           }
       })
   });

    it('Correctly sorts and batches a graph by time period when empty units are removed', () => {
        const output = graphTimeBatcher(testGraph, { removeEmpty: true });
        const mappedOutput = mapToReadableOutput(output);

        expect(mappedOutput).toStrictEqual({
            "01/01/1970": {
                nodes: [NODE_NO_TIME],
                edges: []
            },
            "03/01/1970":{
                nodes:[],
                edges:[EDGE_JAN_2, EDGE_JAN_2_PLUS, EDGE_JAN_2_DOUBLEPLUS]
            },
            "05/01/1970":{
                nodes:[],
                edges:[EDGE_JAN_4]
            },
            "06/01/1970":{
                nodes:[NODE_JAN_5],
                edges:[EDGE_JAN_5]
            },
            "07/01/1970":{
                nodes:[NODE_JAN_6, NODE_JAN_6_PLUS],
                edges:[]
            },
            "11/01/1970":{
                nodes:[NODE_JAN_10],
                edges:[]
            }
        })
    })

});