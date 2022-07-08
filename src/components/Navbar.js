import React from "react";
import { useState } from "react";
import { CurrentCourse } from "./CurrentCourse.js";
import { Header } from "./Header";
import { TeacherContent } from "./TeacherContent.js";

export function Navbar(props) {

    const toggleUser = () => props.toggleUser();

    const selectMode = () => {
        setTimeout(() => {
            let currentMode = document.querySelector("input[name='teacherMode']:checked").value;
            props.toggleMode(currentMode);
        }, 0);
    }

    return (
        <div className="Navbar">
            <div className="NavStick">

                <header>Share Gist</header>

                <Header />

                <div className="toggleUser">
                    <label class="swap swap-flip text-9xl">
                        <input type="checkbox" onChange={toggleUser} />
                        <div class="swap-off">👩‍🏫</div>
                        <div class="swap-on">👨‍🎓</div>
                    </label>
                </div>

                {props.user
                    &&
                    <CurrentCourse course={props.course} />
                }

                {!props.user
                    &&
                <ul class="tMode menu bg-base-100 w-56 rounded-box">

                    <input type="radio" value="tDash" id="tDash" name="teacherMode" defaultChecked/>
                    <li onClick={selectMode}> <label htmlFor="tDash">Dashboard</label></li>

                    <input type="radio" value="tNLesson" id="tNLesson" name="teacherMode"/>
                    <li onClick={selectMode}> <label htmlFor="tNLesson">Add New Lesson</label></li>

                    <input type="radio" value="tNCourse" id="tNCourse" name="teacherMode"/>
                    <li onClick={selectMode}> <label htmlFor="tNCourse">Add New Course</label></li>

                </ul>
                }

            </div>
        </div>
    )
}