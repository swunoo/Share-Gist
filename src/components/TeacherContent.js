import React, { useState } from "react";
import { NewLesson } from "./NewLesson";
import { NewCourse } from "./NewCourse";
import { TeacherDashboard } from "./TeacherDashboard";
import { LoadScreen } from "./LoadScreen";

export function TeacherContent(props) {

    const [loadingState, setLoadingState] = useState(true);
    const [courseData, setCourseData] = useState();

    const loadData = async () => {
      fetch('http://localhost/sGist/ReadController.php', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teacher: true
        })
      }).then(res => res.json())
        .then(data => {
          setLoadingState(false);
          setCourseData(data);
          console.log(data);
        })
  }

  if(loadingState) {
    loadData();
  }

    return (
        <>
            {loadingState && <LoadScreen />}

            {!loadingState &&
                <div className="TeacherContent">
                    {props.tMode === 'tDash' && 
                    <TeacherDashboard 
                      courseData = {courseData} 
                      reload = {loadData}/>}

                    {props.tMode === 'tNLesson' && 
                    <NewLesson courseData = {courseData} />}

                    {props.tMode === 'tNCourse' && 
                    <NewCourse reload = {loadData} />}
                </div>
            }
        </>

    )
}