import React from "react"

export default function UserBlock(props){
    // console.log("PROPS: ",props)

    return (
            <div className="user-block">
                <div className='user'>
                    <div>
                        <h2>User Email: {props.email}</h2>
                    </div>
                    <div>
                        <h2>User ID: {props.id}</h2>
                    </div>
                </div>
            </div>
    )
}