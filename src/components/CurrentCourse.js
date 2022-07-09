import { useState } from "react";
import React from "react";
import { useEffect } from "react";

export function CurrentCourse (props) {

    const [progress, setProgress] = useState(50);

    let lessonArr = [];

    let formerlySelected;

    const selectLesson = (e) => {
        try {
            formerlySelected.classList.remove('selectedLesson');
        } catch (err) {}

        e.target.classList.add('selectedLesson');
        formerlySelected = e.target;
    }

    props.course.lessonList.forEach(lesson => {
        lessonArr.push(
            <li onClick={selectLesson}>{lesson}</li>
        )
    })

    return (
        <div className="CurrentCourse">
            <p>{props.course.title}</p>
            {!props.course.status 
                && 
            <div className="progressWrapper">
                <progress class="progress progress-warning" value={progress} max="100">
                </progress>
                <p>{progress}%</p>
            </div>
            }

            <hr />

            <ol>{lessonArr}</ol>
        </div>
    )
}