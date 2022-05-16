import "./index.css"
import React from "react"
import Question from "./Question"
import Qchecked from "./Qchecked"

function App(props) {

  const [questions, setQuestions] = React.useState([])  // Holds objects from the API
  const [qObject, setQObject] = React.useState([])
  const [isClicked, setIsClicked]= React.useState(false) // To check is start quiz clicked
  const [isChecked,setIsChecked] = React.useState(false)
  const [newQ,setNewQ] = React.useState(false)
  
  
  // Function to shuffle an array
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  const [category,setCategory] = React.useState('')
  const [categoryNumber,setCategoryNumber] = React.useState(0)
  
  // Fetching the questions from the API  
  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${categoryNumber}&type=multiple&encode=url3986`)
    .then(res => res.json())
    .then(result => setQuestions(result.results))
  }, [categoryNumber])


  React.useEffect(()=>{
    const finalQ = questions.map((q)=>{
      const qId = Math.random() * 100
      const damn = []
      for(let i = 0; i < 3; i++){
        let ansId = Math.random() * 100
        damn.push({
          id: ansId,
          answer: decodeURIComponent(q.incorrect_answers[i]),
          isCorrect: false,
          isHeld: false,
          handleClick: () => isHeld(qId,ansId)
        })
      }
      let ansId = Math.random() * 100
      damn.push({
        id: ansId,
        answer: decodeURIComponent(q.correct_answer),
        isCorrect: true,
        isHeld: false,
        handleClick: () => isHeld(qId,ansId)
      })

      shuffle(damn)



      return ({
        question: decodeURIComponent(q.question),
        questionID: qId,
        answer: decodeURIComponent(q.correct_answer),
        multiAnswers: damn
      })
    })
    setQObject(finalQ)
  },[questions])

  function isHeld(qId,id){ 

    setQObject(qObj => qObj.map(a=>{
      let ansArray = []
      for(let i = 0; i < 4; i++){
        ansArray.push(a.multiAnswers[i])
      }

      for(let i = 0; i < 4; i++){
        if(ansArray[i].id === id){
          ansArray[i] = {...ansArray[i],isHeld:!ansArray[i].isHeld}
        }else{
          ansArray[i] = {...ansArray[i],isHeld:false}
        }
      }

      if(a.questionID === qId){
        return {...a,multiAnswers:ansArray}
      }else{
        return a
      }
      
    }))
  }

  const renderQ = qObject.map(a=>{
    return <Question question={a.question} answers={a.multiAnswers} />
    
  })

  function startClick(){
    setIsClicked(!isClicked)
    switch(category){
      case "knowledge":
        setCategoryNumber(9)
        break;
      case "film":
        setCategoryNumber(11)
        break;
      case "music":
        setCategoryNumber(12)
        break;
      case "television":
        setCategoryNumber(14)
        break;
      case "games":
        setCategoryNumber(15)
        break;
      case "nature":
        setCategoryNumber(17)
        break;
      case "sports":
        setCategoryNumber(21)
        break;
      case "history":
        setCategoryNumber(23)
        break;
      case "art":
        setCategoryNumber(25)
        break;
      case "celebs":
        setCategoryNumber(26)
        break;
      case "animals":
        setCategoryNumber(27)
        break;
      default:
        setCategoryNumber(9)
    }
  }

  function checkAnswers(){
    setIsChecked(!isChecked)
  }

  function startAgain(){
    setIsClicked(false)
    setIsChecked(false)
    setNewQ(!newQ)
    setQuestions([])
  }

  return (
    <>
      {isClicked ? (isChecked ? 
        <div className="main-container-s">
          <Qchecked list={qObject} />
          <button className="check-button" onClick={()=>startAgain()}>Play again</button>
        </div>
      : <div className="main-container-s">
          {renderQ}
          <button className="check-button" onClick={()=>checkAnswers()}>Check Answers</button>
        </div> )
      : <div className="main-container">
                  <div className="first-page">
                    
                    <form action="#">
                      <h1>Quizzical</h1>
                      <p>Test your skills!</p>
                      <p>Select category</p>
                      <select name="categories" id="category" onChange={()=>setCategory(document.getElementById('category').value)}>
                        <option value="knowledge">General Knowledge</option>
                        <option value="film">Film</option>
                        <option value="music">Music</option>
                        <option value="television">Television</option>
                        <option value="games">Video Games</option>
                        <option value="nature">Science and Nature</option>
                        <option value="sports">Sports</option>
                        <option value="history">History</option>
                        <option value="art">Art</option>
                        <option value="celebs">Celebrities</option>
                        <option value="animals">Animals</option>
                      </select>
                      <input className="start-button" type="button" value="Start Quiz" 
                            onClick={() => startClick()}/>
                    </form>
                  </div>
                </div>}
    </>
  );
}
export default App;
