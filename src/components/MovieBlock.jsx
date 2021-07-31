import React from "react"

export default function MovieBlock(props){

    return (
            <div className="movie-block">
                <div>
                    <div>
                        <h3 className="movie-title">{props.title}</h3>
                    </div>
                    <div>
                        <img src={props.posterUrl} alt="MoviePoster" />
                    </div>
                </div>
            </div>
    )
}