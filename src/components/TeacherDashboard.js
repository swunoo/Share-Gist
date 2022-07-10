import React from "react";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";

export function TeacherDashboard(props) {

    
    const editCourse = (e) => {
        
    }

    const deleteCourse = (e) => {
        let course_id = e.target.parentElement.parentElement.parentElement.id.substring(7);
        console.log(course_id);
        fetch('http://localhost/sGist/DeleteController.php', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({deleteCourse: course_id})
        }).then(res => res.json())
        .then(data => {
            props.reload();
            console.log(data)});
    }

    let courseCards = [];
    
    props.courseData.forEach(course => {
        courseCards.push(
            <div class="card card-compact shadow-xl" id={`course-${course['id']}`}>
                <figure>
                    <img src={`http://localhost/sGist/images/${course['img_link']}`} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title"> {course['title']} </h2>
                    <p> {course['text']} </p>
                    <div class="card-actions justify-end">
                        <img onClick={editCourse} src={editIcon} alt="" />
                        <img onClick={deleteCourse} src={deleteIcon} alt="" />
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="Dashboard">

            <h1> Your Courses </h1>

            <div className="cards"> {courseCards} </div>

        </div>
    )
}