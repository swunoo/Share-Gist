import React, { useState } from "react";
import { Modal } from "./Modal";

export function NewLesson(props) {

    const [modalTitle, setModalTitle] = useState('Loading, Please Wait......');

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

    // const videoAdder = async (url) => {

    //     let video = document.getElementById('videoInput');

    //     let formData = new FormData();
    //     formData.append('video', video.files[0]);

    //     let res = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //         },
    //         body: formData
    //     });

    //     return await res.json();
    // }

    let courses = [];

    props.courseData.forEach(course => {
        courses.push(
            <option value={course.id}>{course.title}</option>
        )
    })

    return (
        <>

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

                {/* <div className="grid">
                <label htmlFor="lVideo" className="label">Video</label>
                <label for="videoInput" className="imgInputWrapper">
                    <input
                    type="file" 
                    name="lVideo" id="videoInput" />
                    Choose File
                    <span></span>
                </label>
                </div> */}

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
                {/* <button className="btn">Add</button> */}
            </form>

        </>
    )
}