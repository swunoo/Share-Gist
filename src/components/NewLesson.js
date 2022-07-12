import React, { useState } from "react";
import { Modal } from "./Modal";
import { VideoUpload } from "./videoUploader";

export function NewLesson(props) {

    const [modalTitle, setModalTitle] = useState('Loading, Please Wait......');
    const [videoFormTitle, setVideoFormTitle] = useState('Loading');
    const [showVideoForm, setShowVideoForm] = useState(false);

    const addLessonFromBtn = async () => {
        let form = document.getElementById('tNLessonForm');
        await addLessonMain(form);
        form.reset();
    }
    const addLessonFromForm = (e) => {
        e.preventDefault();
    }

    const addLessonMain = async (form) => {

        let course = form['lCourse'].value;
        let title = form['lTitle'].value;
        let text = form['lText'].value;

        let media = form['lMedia'].value;
        
        let duration = form['lDuration'].value;
        let mode = 0 //0 For lesson, 1 for course, 2 for owner

        let obj = { mode, course, title, text, media, duration };

        await apiAdder('http://localhost/sGist/CreateController.php', obj).then(res => console.log(res));

        // videoAdder('http://localhost/sGist/CreateController.php').then(res => console.log(res));

        setModalTitle('Successfully Added');

    }



    const apiAdder = async (url, obj) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        return await res.json();
    }


    const updateCustomUpload = (link) => {
        document.getElementById('tNLessonForm')['lMedia'].value = link;
        setVideoFormTitle('Successfully Added');
    };
    

    const addVideoFromForm = (e) => {
        e.preventDefault();
    }
    
    const addVideoFromBtn = async () => {

        let form = document.getElementById('videoUploadForm');
        let videoFile = form['videoUpload'].files[0];
        let videoName = form['videoName'].value;

        console.log(videoFile, videoName);

        let videoUploader = new VideoUpload (videoFile, videoName);
        
        videoUploader.uploadVideo(updateCustomUpload);
    }

    const displayVideoForm = (e) => {
        setShowVideoForm(true);
    }

    let courses = [];

    props.courseData.forEach(course => {
        courses.push(
            <option value={course.id}>{course.title}</option>
        )
    })

    return (
        <div className="NewLesson">

            <form className="tNForm" id="tNLessonForm" onSubmit={addLessonFromForm} encType='multipart/form-data'>

                <h1>Add New Lesson</h1>

                <label htmlFor="">Select Course</label>
                <select class="select" name="lCourse">
                    {courses}
                </select>

                <div className="grid">
                    <label htmlFor="lTitle" className="label">Title *</label>
                    <input type="text" placeholder="ReactJS Basics" class="input " name="lTitle" required />
                </div>

                <div className="grid">
                    <label htmlFor="lText" className="label">Text</label>
                    <textarea class="textarea" placeholder="..." name="lText"></textarea>
                </div>

                <div className="grid">
                    <label htmlFor="lMedia" className="label">Video Link</label>
                    <input type="text" placeholder="https://.........." class="input" name="lMedia" />
                </div>

                <div className="grid">

                    <label onClick={displayVideoForm}>Upload Video</label>

                    {/* <label htmlFor="lVideo" className="label">Upload Video?</label>
                <label for="videoInput" className="imgInputWrapper">
                    <input
                    type="file" 
                    name="lVideo" id="videoInput" />
                    Choose File
                    <span></span>
                </label> */}
                </div>

                <div className="grid">
                    <label htmlFor="lDuration" className="label">Duration</label>
                    <input type="number" placeholder="(in minutes)" class="input" name="lDuration" />
                </div>

                <Modal
                    modalId={'lessonModal'}
                    promptBtn={<div onClick={addLessonFromBtn} className="btn addBtn"> Add </div>}
                    title={modalTitle}
                    des={""}
                    btn={"OK"}
                />
            </form>

            {showVideoForm &&
                <form id="videoUploadForm" encType="multipart/form-data" onSubmit={addVideoFromForm}>
                    
                    <input type="text" name="videoName" placeholder="Video Name"/>
                    {/* <label for="videoUpload">
                        Choose File
                    </label> */}
                    <input
                            type="file"
                            name="videoUpload" id="videoUpload" />
                    
                    <Modal
                    modalId={'videomodal'}
                    promptBtn={<div onClick={addVideoFromBtn} className="btn addBtn"> Upload </div>}
                    title={videoFormTitle}
                    des={""}
                    btn={"OK"}
                />
                </form>
            }

        </div>
    )
}