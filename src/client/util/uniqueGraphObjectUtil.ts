interface GraphObject {
    id: string;
    timeAdded?: number;
}

export class UniqueGraphObjectUtil<T extends GraphObject> {
    private uniqueGraphObjectMap: { [id: string]: T };

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

    get(): T[] {
        return Object.values(this.uniqueGraphObjectMap);
    }

}