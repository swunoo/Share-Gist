import { useState } from "react";
import React from "react";

export function CurrentLesson () {
    return (
        <div className="CurrentLesson">
            <p>How to Film</p>
            <div className="progressWrapper">
                <progress class="progress progress-warning" value="50" max="100">
                </progress>
                <p>50%</p>
            </div>

            <hr />

            <ol>
                <li className="selectedLesson">Just start filming</li>
                <li>Filming is great</li>
            </ol>
        </div>
    )
}