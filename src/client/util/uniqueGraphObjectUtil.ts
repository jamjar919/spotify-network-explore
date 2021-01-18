interface GraphObject {
    id: string;
    timeAdded?: number;
    size?: number;
    count?: number;
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
            this.updateObjectInMapIfNewer(object);
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
            this.updateObjectInMapIfNewer(object);
            this.uniqueGraphObjectMap[object.id].size = currentSize + 1;
        }
    }

    addOrIncrementSizeLog(object: T) {
        if (this.uniqueGraphObjectMap[object.id] === undefined) {
            this.uniqueGraphObjectMap[object.id] = {
                ...object,
                size: Math.log(2), // count + 1
                count: 1
            };
        } else {
            const newCount = (this.uniqueGraphObjectMap[object.id].count || 1) + 1;

            this.updateObjectInMapIfNewer(object);
            this.uniqueGraphObjectMap[object.id].size = Math.log(newCount + 1);
            this.uniqueGraphObjectMap[object.id].count = newCount;
        }
    }

    private updateObjectInMapIfNewer(newObject: T): void {
        // We want the timestamp where it was added first
        const currentTimeAdded = this.uniqueGraphObjectMap[newObject.id].timeAdded || 0;
        const objectTimeAdded = newObject.timeAdded || 0;
        if (currentTimeAdded > objectTimeAdded) {
            this.uniqueGraphObjectMap[newObject.id] = newObject;
        }
    }

    get(): T[] {
        return Object.values(this.uniqueGraphObjectMap);
    }

}