/**
 * To Upload a Video to Vimeo:
 * 1. Create an instance with two arguments.
 * 2. Call the uploadVideo method and pass in a callback function as argument.
 */

export class VideoUpload {

    constructor(videoFile, videoName){
        this.videoFile = videoFile;  
        this.videoName = videoName;

        this.accessToken = "bearer 78cd4b0d6b6674af07698460fdd014eb";
        
        // Privacy settings:
        this.view = "unlisted";
        this.embed = "public";
    }

    async uploadVideo(updateFunc){
        this.useVimeoApi(this.videoFile.size)
        .then((res) => {
            let formURL = (res.upload.form.split('"'))[3];
            let videoURL = res.link;
            this.uploadToVimeo(formURL, this.videoFile)
                .then(result => {
                    console.log('added');
                    console.log(videoURL);
                    updateFunc(videoURL);
                }).catch(err => console.log(err));
        });
    }
    
    async useVimeoApi(videoSize){
        let res = await fetch("https://api.vimeo.com/me/videos", {
            method: "POST",
            headers: {
                Authorization: this.accessToken,
                "Content-Type": "application/json",
                Accept: "application/vnd.vimeo.*+json;version=3.4",
            },
            body: JSON.stringify({
                "upload": {
                    "approach": "post",
                    "size": videoSize,
                },
                "name": this.videoName,
                "privacy": { "view": this.view, "embed": this.embed }
            }),
        });
    
        return await res.json();
    }

    async uploadToVimeo(url, videoFile){
        let formData = new FormData();
        formData.append('file_data', videoFile);
    
        let res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData
        })
        
        return res;
    }

}

// export const uploadVideo = async (videoFile) => {
//     useVimeoApi(videoFile.size)
//         .then((res) => {
//             let formURL = (res.upload.form.split('"'))[3];
//             uploadToVimeo(formURL, videoFile, res.link);
//         });
// };

// export const useVimeoApi = async (videoSize) => {
//     let res = await fetch("https://api.vimeo.com/me/videos", {
//         method: "POST",
//         headers: {
//             Authorization: "bearer 78cd4b0d6b6674af07698460fdd014eb",
//             "Content-Type": "application/json",
//             Accept: "application/vnd.vimeo.*+json;version=3.4",
//         },
//         body: JSON.stringify({
//             "upload": {
//                 "approach": "post",
//                 "size": videoSize,
//             },
//             "name": "Sandboxing for Project",
//             "privacy": { "view": "unlisted", "embed": "public" }
//         }),
//     });

//     return await res.json();
// };

// export const uploadToVimeo = async (url, videoFile, videoURL) => {
//     let formData = new FormData();
//     formData.append('file_data', videoFile);

//     fetch(url, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//         },
//         body: formData
//     }).then(res => console.log(videoURL))
//         .catch(err => console.log(err))
// }
