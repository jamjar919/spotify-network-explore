interface GraphObject {
    id: string;
    timeAdded?: number;
    size?: number;
}

export class UniqueGraphObjectUtil<T extends GraphObject> {
    private readonly uniqueGraphObjectMap: { [id: string]: T };

    constructor() {
        this.uniqueGraphObjectMap = {};
    }

    add(object: T) {
        if (this.uniqueGraphObjectMap[object.id] === undefined) {
            this.uniqueGraphObjectMap[object.id] = object;
        } else {
            // We want the timestamp where it was added first
            const currentTimeAdded = this.uniqueGraphObjectMap[object.id].timeAdded || 0;
            const objectTimeAdded = object.timeAdded || 0;
            if (currentTimeAdded > objectTimeAdded) {
                this.uniqueGraphObjectMap[object.id] = object;
            }
        }
    }

    addOrIncrementSize(object: T) {
        if (this.uniqueGraphObjectMap[object.id] === undefined) {
            this.uniqueGraphObjectMap[object.id] = {
                ...object,
                size: 1
            };
        } else {
            const currentSize = this.uniqueGraphObjectMap[object.id].size || 1;

            // We want the timestamp where it was added first
            const currentTimeAdded = this.uniqueGraphObjectMap[object.id].timeAdded || 0;
            const objectTimeAdded = object.timeAdded || 0;
            if (currentTimeAdded > objectTimeAdded) {
                this.uniqueGraphObjectMap[object.id] = object;
            }

            this.uniqueGraphObjectMap[object.id].size = currentSize + 1;
        }
    }

    get(): T[] {
        return Object.values(this.uniqueGraphObjectMap);
    }

}