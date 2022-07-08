import React, { Fragment } from "react";
import { useState } from "react";

export function Content (props) {

    const [iFrame, setIFrame] = useState('');

    const getVideo = async (url) => {
        let res = await fetch (`https://vimeo.com/api/oembed.json?url=${url}&byline=0&portrait=0&title=0&width=360&height=240`).then(res => res.json()).then(data => {
            setIFrame(data.html);
        });
    }

    // setIFrame('<div>Hello</div>');

    getVideo (props.lesson.video_link);

    return (
        <div className="Content">

            <header>{props.lesson.title}</header>

            <div className="video">
                <div dangerouslySetInnerHTML={{ __html: iFrame }} />
            </div>
            <div className="text">
                {props.lesson.text}
            </div>
        </div>
    )
}