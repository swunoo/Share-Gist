import React from "react";
import { useState } from "react";
import { Modal } from "./Modal";

export function NewCourse(props) {

    const [modalTitle, setModalTitle] = useState('Loading, Please Wait......');

    const addCourseFromBtn = async () => {
        let form = document.getElementById('tNCourseForm');
        await addCourseMain(form);
        form.reset();
    }
    const addCourseFromForm = (e) => {
        e.preventDefault();
    }

    const addCourseMain = async (form) => {

        let url = 'http://localhost/sGist/CreateController.php';
        let media;

        await imgAdder(url).then(res => media = res);

        let title = form['lTitle'].value;
        let category = form['lCategory'].value;
        let text = form['lText'].value;
        let duration = form['lDuration'].value;
        let mode = 1 //0 For lesson, 1 for course, 2 for owner.

        let obj = {mode, title, category, text, media, duration};

        await apiAdder(url, obj).then(res => {
            props.reload();
            console.log(res)});

        console.log('files sent');

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

    const imgAdder = async (url) => {

        let imgFile = document.getElementById('imgInput');

        let formData = new FormData();
        formData.append('media', imgFile.files[0]);

        let res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData
        });

        return await res.json();
    }

    const showFileName = (e) => {
        let fileName = (e.target.value).replace('fakepath\\', '');
        document.querySelector('.imgInputWrapper > span').textContent = fileName;
    }

    return (
        <form className="tNForm" id="tNCourseForm" onSubmit={addCourseFromForm}encType="multipart/form-data" method="POST">
            <h1>Add New Course</h1>

            <div className="grid">
                <label htmlFor="lTitle" className="label">Title *</label>
                <input type="text" placeholder="ReactJS Basics" class="input " name="lTitle" required />
            </div>

            <div className="grid">
                <label htmlFor="lCategory" className="label">Category *</label>
                <input type="text" placeholder="ReactJS Basics" class="input " name="lCategory" required />
            </div>

            <div className="grid">
                <label htmlFor="lText" className="label">Description</label>
                <textarea class="textarea" placeholder="..." name="lText"></textarea>
            </div>

            <div className="grid">
                <label htmlFor="lMedia" className="label">Image</label>
                <label for="imgInput" className="imgInputWrapper">
                    <input
                    type="file" 
                    onChange = {showFileName}
                    name="lMedia" id="imgInput" />
                    Choose File
                    <span></span>
                </label>
            </div>

            <div className="grid">
                <label htmlFor="lDuration" className="label">Duration</label>
                <input type="number" placeholder="(in minutes)" class="input" name="lDuration" />
            </div>

            <Modal
                    modalId={'courseModal'}
                    promptBtn={<div onClick={addCourseFromBtn} className="btn addBtn"> Add </div>}
                    title={modalTitle}
                    des={""}
                    btn={"OK"}
            />

        </form>
    )
}