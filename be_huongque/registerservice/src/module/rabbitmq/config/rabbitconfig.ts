export class FileUploadRequest {
    fileName: string;
    fileContent: string;
    bucketName: string;
    contentType: string;

}
export class FileUploadResponse {
    success: boolean;
    message: string;
    
}