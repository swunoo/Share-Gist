import React, { Fragment } from "react";
import { useState } from "react";
import { LoadScreen } from "./LoadScreen.js";

import { getIframeYoutube, getIframeVimeo } from './videoToIframe.js';

export function Content (props) {

    const [iFrame, setIFrame] = useState('');

    const getVideo = async (url) => {
        (url.charAt('8') === 'v' 
            ? getIframeVimeo(url, setIFrame) 
            : getIframeYoutube (url, setIFrame));
    }

    if(props.lesson && props.lesson['video_link']) {
        getVideo (props.lesson['video_link']);
    }

    return (

        <div className="Content">

            {
            props.lesson && 
            <>
                <header>{props.lesson.title}</header>
                <div className="video">
                    <div dangerouslySetInnerHTML={{ __html: iFrame }} />
                </div>
                <div className="text">
                    {props.text}
                </div>
            </>
            }

            {!props.lesson && <LoadScreen />}


        </div>
    )
}