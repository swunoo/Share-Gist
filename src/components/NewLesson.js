import React from "react";

export function NewLesson() {

    return (
        <form className="tNForm" id="tNLessonForm">
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