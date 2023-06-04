import React, {useState, useEffect} from "react";
//step-3 import QuestionItem comp
import QuestionItem from "./QuestionItem"



//step-4 pass jsondata state prop from App comp and add useState to import
function QuestionList() {

//step-1 add state
const [questions, setQuestions] = useState([])
//step-2 fetch GET
useEffect(()=>
fetch("http://localhost:4000/questions")
.then(r=>r.json())
.then(questions=>setQuestions(questions))
, [])

//step-3 display questions after GET fetch
  const questionItems = questions.map((q) => (
    <QuestionItem 
      key={q.id} 
      question={q}
      // step=6 add onAddQuestion prop
      onAddQuestion={handlePatch}
      // step-11 add onDelete prop
      onDelete={handleDelete} />
  ))

//step-5 fetch PATCH
function handlePatch(id, correctIndex){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({correctIndex}),
  })
  .then(r=>r.json())
  .then(updatedQuestion=>{
    const updatedQuestions = questions.map(q=>{
      if (q.id === updatedQuestion.id) {return updatedQuestion}
      else {return q}
    })
    setQuestions(updatedQuestions)
  })
}

//step-10 fetch DELETE
function handleDelete(id){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
  .then(r=>r.json())
  .then(()=>{
    const updatedQuestions = questions.filter(q=>q.id !== id)
    setQuestions(updatedQuestions)
  })
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {/* step-4 display after fetch GET */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
