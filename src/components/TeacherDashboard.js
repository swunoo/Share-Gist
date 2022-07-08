import React from "react";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";

export function TeacherDashboard() {
    return (
        <div className="TeacherDashboard">

            <h1> Your Courses </h1>

            <div className="cards">
                <div class="card card-compact shadow-xl">
                    <figure>
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Film Making 101 </h2>
                        <p> The description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, eaque! </p>
                        <div class="card-actions justify-end">
                            <img src={editIcon} alt="" />
                            <img src={deleteIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div class="card card-compact shadow-xl">
                    <figure>
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Film Making 101 </h2>
                        <p> The description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, eaque! </p>
                        <div class="card-actions justify-end">
                            <img src={editIcon} alt="" />
                            <img src={deleteIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div class="card card-compact shadow-xl">
                    <figure>
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Film Making 101 </h2>
                        <p> The description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, eaque! </p>
                        <div class="card-actions justify-end">
                            <img src={editIcon} alt="" />
                            <img src={deleteIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}