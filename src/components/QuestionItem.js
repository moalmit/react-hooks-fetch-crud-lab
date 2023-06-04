import React from "react";

//step-7 include onAddQuestion prop
//step-12 include onDelete prop
function QuestionItem({ question, onAddQuestion, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

//step-8 handle add question click
function handleAddQuestion (e){
  onAddQuestion(id, parseInt(e.target.value))
}

//step-13 handle delete click
function handleDelete(){
  onDelete(id)
}


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        {/* step-9 add onChange event */}
        <select defaultValue={correctIndex} onChange={handleAddQuestion}>
          {options}</select>
      </label>
      {/* step-14 add onDelete evennt */}
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
