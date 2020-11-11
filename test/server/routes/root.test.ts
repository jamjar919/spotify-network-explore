import {clientJavascript, root} from "../../../src/server/routes/root";

describe('root', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = { };
        res = {
            sendFile: jest.fn()
        }
    });

    it('returns the html index file', () => {
        root(req, res);

        const sendFileParameter = res.sendFile.mock.calls[0][0];
        expect(sendFileParameter.split("/").slice(-1)[0]).toBe("index.html");
    });

    it('returns the client javascript file', () => {
        clientJavascript(req, res);

        const sendFileParameter = res.sendFile.mock.calls[0][0];
        expect(sendFileParameter.split("/").slice(-1)[0]).toBe("client.js");
    })
});