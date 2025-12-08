export interface CustomToastInterface {
    type: 'success' | 'failed' | 'info' | '';
    message: string;
    title?: string;
}