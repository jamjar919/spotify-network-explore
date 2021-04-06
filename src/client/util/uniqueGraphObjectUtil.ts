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

    addOrApplyFunction(object: T, extraProps: (object: T) => any) {
        if (this.uniqueGraphObjectMap[object.id] === undefined) {
            this.uniqueGraphObjectMap[object.id] = {
                ...object,
                ...extraProps(object)
            };
        } else {
            this.updateObjectInMapIfNewer(object);
            this.uniqueGraphObjectMap[object.id] = {
                ...this.uniqueGraphObjectMap[object.id],
                ...extraProps(this.uniqueGraphObjectMap[object.id])
            };
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