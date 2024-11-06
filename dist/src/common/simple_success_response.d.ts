export interface SuccessResponse<T> {
    status: 'success';
    data: T;
}
export declare function NewSuccessResponse(data: any): SuccessResponse<any>;
