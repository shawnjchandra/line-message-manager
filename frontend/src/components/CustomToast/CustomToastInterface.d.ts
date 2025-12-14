export interface CustomToastInterface {
    type: 'success' | 'failed' | 'info' | '';
    message: string | React.ReactNode;
    title?: string;
    delay?: number;
}