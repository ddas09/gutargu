export interface CustomResponse<T> {
    data: T | null;
    status: string;
    message: string;
}