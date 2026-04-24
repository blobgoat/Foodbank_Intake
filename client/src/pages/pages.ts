import { AccountHolderAPI } from "./AccountHolder";

export type Page = 'Start' | 'AccountHolderInfo';

export interface PageAPI {
    headerName: string,
    loadbarPercentage: number,
    infoText: string,
    subheader: string,
    notice: string,
}

export const Pages: {
    currentPage: Page;
    setPage(newPage: Page): void;
    getPageAPI(): PageAPI;
} = {
    currentPage: 'Start' as Page,
    setPage(newPage: Page) {
        this.currentPage = newPage;
    },
    getPageAPI(): PageAPI {
        switch (this.currentPage) {
            case 'Start':
                throw new Error('Start page does not have a header');
            case 'AccountHolderInfo':
                return AccountHolderAPI;
        };
    }
} as const;
