import axios from 'axios';

jest.mock('crypto-js', () => ({
    MD5: jest.fn(() => ({
        toString: jest.fn(() => 'mockHash'),
    })),
}));

jest.mock('axios');

describe('api service', () => {
    const mockDate = new Date(1609459200000);
    const mockTs = mockDate.getTime();
    const publicKey = 'publicKey';
    const privateKey = 'privateKey';
    const mockHash = 'mockHash';

    let OriginalDate: DateConstructor;
    let api: any;

    beforeAll(() => {
        OriginalDate = global.Date;

        process.env.REACT_APP_MARVEL_PUBLIC_KEY = publicKey;
        process.env.REACT_APP_MARVEL_PRIVATE_KEY = privateKey;
        process.env.REACT_APP_API_URL = 'https://gateway.marvel.com';

        global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;

        jest.resetModules();
        api = require('../../services/api').default;
    });

    afterAll(() => {
        global.Date = OriginalDate;
        jest.restoreAllMocks();
    });

    test('should create an axios instance with the correct configuration', () => {
        const expectedConfig = {
            baseURL: 'https://gateway.marvel.com',
            params: {
                ts: mockTs,
                apikey: publicKey,
                hash: mockHash,
            },
        };

        expect(axios.create).toHaveBeenCalledWith(expectedConfig);
    });

    test('should export the created axios instance', () => {
        expect(api).toBeDefined();
    });
});
