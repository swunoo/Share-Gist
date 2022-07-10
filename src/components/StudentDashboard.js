import React from "react";

export function StudentDashboard(props) {

    const selectCourse = (e) => {
        props.selectCourse(e.currentTarget);
    }

    let courseCards = [];
    
    props.courseData.forEach(course => {
        courseCards.push(
            <div onClick={selectCourse} class="card card-compact shadow-xl" id={`stdCourse-${course['id']}`}>
                <figure>
                    <img src={`http://localhost/sGist/images/${course['img_link']}`} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title"> {course['title']} </h2>
                    <p> {course['text']} </p>
                </div>
            </div>
        )
    });

    return (
        <div className="Dashboard">

            <h1> Available Courses </h1>

            <div className="cards"> {courseCards} </div>

        </div>
    )
}