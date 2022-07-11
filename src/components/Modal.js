import React, { useEffect } from "react";

export function Modal(props) {

    /**
     * props.prompt, props.title, props.des and props.btn must be provided.
     * props.promptBtn is optional.
     */

    let effectUsed = false;

    useEffect(() => {

        if(effectUsed) return;

        else {
            effectUsed = true;
            console.log('usingEffect');
    
            let modals = document.querySelector('.modal-toggle');

            //Probably remove event listener when a new Component is mounted.
    
            modals.addEventListener('focus', () => {
                
                // console.log('clicked');
    
                let cards =  document.querySelector('.cards');
                // console.log(cards.style.display);
    
                if (cards.style.display === 'none'){
                    // console.log('it is now none');
                    cards.style.display = 'flex';
                } else {
                    // console.log('it is now: ', cards.style.display);
                    cards.style.display = 'none';
                }

        })}

    }, [])

    let promptBtn = props.promptBtn ? props.promptBtn : (<label for="my-modal-6" class="btn modal-button">{props.prompt}</label>);

    return (
        <div className="Modal">
            { promptBtn }
            <input type="checkbox" id="my-modal-6" class="modal-toggle " />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">{props.title}</h3>
                    <p class="py-4">{props.des}</p>
                    <div class="modal-action">
                        <label for="my-modal-6" class="btn">{props.btn}</label>
                    </div>
                </div>
            </div>
        </div >
    )
}