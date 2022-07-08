import React from "react";

export function NewLesson() {

    const addLesson = (e) => {

        e.preventDefault();

        let course = e.target ['lCourse'].value;
        let title = e.target ['lTitle'].value;
        let text = e.target ['lText'].value;
        let media = e.target ['lMedia'].value;
        let duration = e.target ['lDuration'].value;
        let mode = 0 //0 For lesson, 1 for course, 2 for owner.

        let obj = {mode, course, title, text, media, duration};

        apiAdder('http://localhost/sGist/CreateController.php', obj).then(res => console.log(res));

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

    return (
        <form className="tNForm" id="tNLessonForm" onSubmit={addLesson}>
            <h1>Add New Lesson</h1>

            <select class="select" name="lCourse">
                <option disabled selected>Please Select Course</option>
                <option>Filmmaking</option>
                <option>ReactJS</option>
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
                <label htmlFor="lDuration" className="label">Duration</label>
                <input type="number" placeholder="(in minutes)" class="input" name="lDuration" />
            </div>

            <button className="btn">Add</button>

        </form>
    )
}