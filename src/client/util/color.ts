export const colorFromString = (text: string) =>
    `#${((parseInt(text.replace(/[^\w\d]/g, ""), 36)) % 16777215).toString(16)}`;

type NodeColourRetriever = (id: string) => string;
export const initialiseGraphColour = (): NodeColourRetriever => {
    const mapToColour: { [id: string]: string } = {};
    const colorIterator: Iterator<string> = (function*() {
        const allHex: string[] = [
            "#019935",
            "#ebb904",
            "#dd4401",
            "#db0020",
            "#ae0076",
            "#01479a"
        ];

        let i = -1;
        while (true) {
            i += 1;
            if (i >= allHex.length) {
                i = 0;
            }
            yield allHex[i];
        }
    })();

    return (id: string) => {
        if (!(id in mapToColour)) {
            mapToColour[id] = colorIterator.next().value;
        }
        return mapToColour[id];
    }
};