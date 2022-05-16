import React from "react"
import "./index.css"

export default function Question(props){

    return(
         <>
            <p className="q-title">{props.question}</p>
            <div className="answer-container">
                {props.answers.map(a=>{
                    return <p className="single-answer" 
                              onClick={()=>a.handleClick(a.id)}
                              style={{backgroundColor: a.isHeld ? "#A2BBF3" : "#e5ebf8"}}
                              >{a.answer}</p>
                })}
            </div>
            <hr></hr>
        </>
    )
}