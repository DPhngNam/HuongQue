export interface RabbitConfig {}
export interface FileUploadRequest {
    fileName: string;
    fileContent: Buffer;
    bucketName: string;
    contentType: string;

}
export interface FileUploadResponse {
    success: boolean;
    message: string;
    
}