import React from "react";
import { NewLesson } from "./NewLesson";
import { NewCourse } from "./NewCourse";
import { TeacherDashboard } from "./TeacherDashboard";

export function TeacherContent (props) {

    return (
        <div className="TeacherContent">
            { props.tMode === 'tDash' && <TeacherDashboard /> }

            { props.tMode === 'tNLesson' && <NewLesson /> }

            { props.tMode === 'tNCourse' && <NewCourse/> }
        </div>
    )
}