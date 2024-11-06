declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class PageOptionDto {
    orderBy: Order;
    readonly page: number;
    readonly take: number;
    get skip(): number;
}
export {};
