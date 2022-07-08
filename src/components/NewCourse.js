import React from "react";

export function NewCourse() {

    const showFileName = (e) => {
        let fileName = (e.target.value).replace('fakepath\\', '');
        document.querySelector('.imgInputWrapper > span').textContent = fileName;
    }

    return (
        <form className="tNForm" id="tNCourseForm">
            <h1>Add New Course</h1>

            <div className="grid">
                <label htmlFor="lTitle" className="label">Title *</label>
                <input type="text" placeholder="ReactJS Basics" class="input " name="lTitle" required />
            </div>

            <div className="grid">
                <label htmlFor="lText" className="label">Description</label>
                <textarea class="textarea" placeholder="..." name="lText"></textarea>
            </div>

            <div className="grid">
                <label htmlFor="lMedia" className="label">Image</label>
                <label for="imgInput" className="imgInputWrapper">
                    <input onChange={showFileName} type="file" placeholder="(png/jpg/jpeg)" class="input" name="lMedia" id="imgInput" />
                    Choose File
                    <span></span>
                </label>
            </div>

            <div className="grid">
                <label htmlFor="lDuration" className="label">Duration</label>
                <input type="number" placeholder="(in minutes)" class="input" name="lDuration" />
            </div>

            <button className="btn">Add</button>

        </form>
    )
}