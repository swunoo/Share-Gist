import React from "react";
import { CurrentLesson } from "./CurrentLesson.js";
import { Header } from "./Header";

export function Navbar (props) {
    return (
        <div className="Navbar">
            <div className="NavStick">
                <header>Share Gist</header>
                <Header />
                <CurrentLesson />
            </div>
        </div>
    )
}