import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { LoadScreen } from "./LoadScreen.js";
import { StudentDashboard } from "./StudentDashboard.js";
import { Lessons } from "./Lessons.js";

export function StudentContent (props) {

    const [sDash, setSDash] = useState(true);

    const [loadingState, setLoadingState] = useState(true);
    const [courseData, setCourseData] = useState(null);

    const [lesson, setLesson] = useState(null);
    const [text, setText] = useState(null);

    const selectCourse = (obj) => {
        let courseId = obj.id.substring(10);
        
        fetch('http://localhost/sGist/ReadController.php', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          course: courseId
        })
        }).then(res => res.json())
        .then(data => {
            console.log(data);

            if(!data.exception){
              setLesson(data.details[0]);
              setText(data.details[1]);

              props.lessonList(data.lessons);
              let newTitle = searchTitle(courseId);
              props.courseTitle(newTitle);
  
              setSDash(false);
            }
            
        })
    }

    const searchTitle = (courseId) => {
        let title;
        let i = 0, length = courseData.length;
        while (!title && i < length) {
            if(courseData[i]['id'] == courseId){
                title = courseData[i]['title'];
            }
            i++;
        }
        return title;
    }

    const loadSelectedLesson = async () => {

      if(props.lessonId === null) return;

      else {
        fetch('http://localhost/sGist/ReadController.php', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({lesson: props.lessonId})
        }) .then(res => res.json()).then(data => {
          console.log(data);
          setLesson(data.details[0]);
          setText(data.details[1]);
        })
      }
    }

    useEffect(() => {
      loadSelectedLesson();
    }, [props.newLesson])


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
        })
  }

  if(loadingState) {
    loadData();
  }

    return (

        <div className="Content">

            {loadingState && <LoadScreen />}

            {
            !loadingState && 
            <>
                {sDash &&  
                <StudentDashboard 
                    courseData = {courseData} 
                    selectCourse = {selectCourse} />}
                {!sDash && 
                <Lessons 
                    lesson = {lesson}
                    text = {text} />}
            </>
            }



        </div>
    )
}