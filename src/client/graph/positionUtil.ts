export type NodePosition =  { x: number, y: number };

export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

const RANDOMISE_SCALE = 10;

export const getRandomPosition = (): NodePosition => ({
    x: Math.random(),
    y: Math.random()
});

export const randomisePosition = (position: NodePosition): NodePosition => ({
    x: position.x + (Math.random() - .5)/RANDOMISE_SCALE,
    y: position.y + (Math.random() - .5)/RANDOMISE_SCALE
});
