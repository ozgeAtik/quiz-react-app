import React from "react"
import "./index.css"

export default function Qchecked(props){
    console.log(props.list)
    return(
         <>
           {props.list.map(q=>{
               return (
                   <>
                    <p className="q-title">{q.question}</p>
                    <div className="answer-container">
                        {q.multiAnswers.map(a => {
                            return <p 
                                    id="single-answer-changed"
                                    className="single-answer"
                                    style={{backgroundColor: a.isCorrect ? "#A2F3B1" : (a.isHeld ? "#F58C8C" : "#e5ebf8"),
                                    color: a.isCorrect ? "black" : "#b0b0b0"}}>{a.answer}</p>
                        })}
                    </div>
                    <hr></hr>
                   </>
               )
           })}
        </>
    )
}