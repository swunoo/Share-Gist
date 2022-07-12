import React, { useEffect } from "react";

export function Modal(props) {

    const submitVideoForm = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * props.prompt, props.title, props.des and props.btn must be provided.
     * props.promptBtn is optional.
     */

    console.log('modal added as ', props.modalId);

    let effectUsed = false;

    useEffect(() => {

        if(effectUsed) return;

        else {
            effectUsed = true;
            console.log('usingEffect');
    
            let modals = document.querySelector(`#${props.modalId}`);

            //Probably remove event listener when a new Component is mounted.
    
            modals.addEventListener('change', () => {
                
                console.log('clicked');
    
                let cards =  document.querySelector('.cards');

                if(cards){
                    if (cards.style.display === 'none'){
                        cards.style.display = 'flex';
                    } else {
                        cards.style.display = 'none';
                    }
                }
    

        })}

    }, [])

    return (
        <div className="Modal">
            <label for={props.modalId} class="btn modal-button">
                {props.promptBtn}
            </label>
            <input type="checkbox" id={props.modalId} class="modal-toggle " />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">{props.title}</h3>
                    <p class="py-4">{props.des}</p>
                    <div class="modal-action">
                        <label for={props.modalId} class="btn">{props.btn}</label>
                    </div>
                </div>
            </div>
        </div >
    )
}