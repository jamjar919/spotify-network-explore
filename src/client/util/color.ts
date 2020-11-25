export const colorFromString = (text: string) =>
    `#${((parseInt(text.replace(/[^\w\d]/g, ""), 36)) % 16777215).toString(16)}`;

type NodeColourRetriever = (id: string) => string;
export const initialiseGraphColour = (): NodeColourRetriever => {
    const mapToColour: { [id: string]: string } = {};
    const colorIterator: Iterator<string> = (function*() {
        const allHex: string[] = [
            "#16643C",
            "#1b7d4b",
            "#2f9963",
            "#43b47a",
            "#56c98e",
            "#68dea1",
            "#fdb0cd",
            "#fd97bd",
            "#fc7dad",
            "#fb4a8d",
            "#f90c66",
            "#B30547"
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