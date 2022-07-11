import { useEffect, useState } from "react";
import React from "react";
import { LoadScreen } from "./LoadScreen.js";

export function CurrentCourse (props) {

    const [progress, setProgress] = useState(0);

    const [lessonListReady, setLessonListReady] = useState(false);
    const [lessonList, setLessonList] = useState([]);

    let formerlySelected;


    const selectLesson = () => {
        setTimeout(() => {
            let selectedLesson = document.querySelector("input[name='selectedLesson']:checked").value;
            console.log(selectedLesson);
            props.updateLesson(selectedLesson);
        }, 0);
    }

    // if(props.lessonList !== null && !lessonListReady){
    //     let lessonArr = [];
    //     props.lessonList.forEach(lesson => {
    //         lessonArr.push(
    //             <div className="lessonTitleWrapper">
    //                 <input type="radio" value={lesson.id} id={`lesson-${lesson.id}`} name="selectedLesson"/>
    //                 <li onClick={selectLesson}> <label htmlFor={`lesson-${lesson.id}`}>{lesson.title}</label></li>
    //             </div>
    //         )
    //     })
    //     setLessonList(lessonArr);
    //     setLessonListReady(true);
    // }

    useEffect(() => {
        if(props.lessonList === null) return;
        
        else {

            let lessonArr = [];
            props.lessonList.forEach(lesson => {
                lessonArr.push(
                    <div className="lessonTitleWrapper">
                        <input type="radio" value={lesson.id} id={`lesson-${lesson.id}`} name="selectedLesson"/>
                        <li onClick={selectLesson}> <label htmlFor={`lesson-${lesson.id}`}>{lesson.title}</label></li>
                    </div>
                )
            })
            setLessonList(lessonArr);
            setLessonListReady(true);

        }
    }, [props.lessonList]);

    return (
        <>
        
        {props.lessonList === null && <LoadScreen />}

        {props.lessonList !== null &&
            <div className="CurrentCourse">
                <p>{props.courseTitle}</p>
                <div className="progressWrapper">
                    <progress class="progress progress-warning" value={progress} max="100">
                    </progress>
                    <p>{progress}%</p>
                </div>

                <hr />

                {
                lessonListReady && 
                    <ol className="sCourse">
                        {lessonList}    
                    </ol>
                }
            </div>
        }
        
        </>
        
    )
}