export interface SuccessResponse<T> {
    status: 'success';
    data: T;
}

export function NewSuccessResponse(data: any): SuccessResponse<any> {
    return {
        status: 'success',
        data: data,
    };
}