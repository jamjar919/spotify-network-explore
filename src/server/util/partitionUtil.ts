/**
 * Split one array into many of max size defined
 * [1,2,3,4,5] -> [1,2] [3,4] [5]
 * @param objects
 * @param maxPerPartition
 */
export const partition = <T extends {}> (
    objects: T[],
    maxPerPartition: number
): Array<T[]> => {
    const partitions: Array<T[]> = [];
    let currentPartition: T[] = [];
    for (let i = 0; i < objects.length; i += 1) {
        if (currentPartition.length >= maxPerPartition) {
            partitions.push(currentPartition);
            currentPartition = []
        }
        currentPartition.push(objects[i]);
    }

    if (currentPartition.length > 0) {
        partitions.push(currentPartition);
    }

    return partitions;
};
