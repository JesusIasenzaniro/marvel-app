export interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    dates: {
        type: string;
        date: string;
    }[];
}
