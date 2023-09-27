export const  AXIOS_REQ_UPLOADED  = '[LOADER] CLOSE';
export const AXIOS_REQ_UPLOADING = '[LOADER] SHOW';

export function axiosRequestUploading()
{
    return {
            type: AXIOS_REQ_UPLOADING,
        }
}

export function axiosRequestUploaded()
{
    return {
            type: AXIOS_REQ_UPLOADED,
        }
}
