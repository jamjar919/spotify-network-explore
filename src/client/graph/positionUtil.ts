export type NodePosition =  { x: number, y: number };

export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

const RANDOMISE_SCALE = 1000;
const SUBSEQUENT_RANDOMISE_SCALE = RANDOMISE_SCALE * .1;

export const getRandomPosition = (): NodePosition => ({
    x: (Math.random() - .5) * RANDOMISE_SCALE,
    y: (Math.random() - .5) * RANDOMISE_SCALE
});

export const randomisePosition = (position: NodePosition): NodePosition => ({
    x: position.x + (Math.random() - .5) * SUBSEQUENT_RANDOMISE_SCALE,
    y: position.y + (Math.random() - .5) * SUBSEQUENT_RANDOMISE_SCALE
});
