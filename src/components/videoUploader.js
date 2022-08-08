/**
 * To Upload a Video to Vimeo:
 * 1. Create an instance with two arguments (1. File data from the form. 2. Name of the Video).
 * 2. Call the "uploadVideo" method and pass in a callback function as argument.
 */

export class VideoUpload {

    constructor(videoFile, videoName){
        this.videoFile = videoFile;  
        this.videoName = videoName;
        this.accessToken = '' //ADD YOUR ACCESS TOKEN HERE;
        
        // Privacy settings:
        this.view = "unlisted";
        this.embed = "public";
    }

    async uploadVideo(updateFunc){
        this.useVimeoApi(this.videoFile.size)
        .then((res) => {
            let formURL = (res.upload.form.split('"'))[3];
            console.log("formURL here: ", formURL);
            let videoURL = res.link;
            console.log("Video URL Here: ", videoURL);
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