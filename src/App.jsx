import './App.css';
import { useState } from 'react';
import img from "./assets/image.png"

const Flashcard = ({ question, answer, category, image }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  let cardStyle = {};
  if (category === "character") {
    cardStyle.backgroundColor = "blue";
  } else if (category === "pinyin") {
    cardStyle.backgroundColor = "green";
  } else if (category === "english") {
    cardStyle.backgroundColor = "red";
  }

  return (
    <div className='flashcard' style={cardStyle} onClick={toggleCard}>
      {isFlipped ? <div className='back'>{answer}</div> : 
      <div className='front'>{image ? (<><img src={image} alt='question_img'/><p>{question}</p></>) : question}</div>}
    </div>
  );
}

const App = () => {
  const flashcards = [
    {question:"目前的拼音", answer:"mu4qian2", category:"pinyin", image:img},
    {question:"目前的英文", answer:"currently", category:"english", image:img},
    {question:"面臨的英文", answer:"to be faced with", category:"english"},
    {question:"面臨的拼音", answer:"mian4lin2", category:"pinyin"},
    {question:"reduce的中文", answer:"減少", category:"character"},
    {question:"買的書面語", answer:"購買", category:"character"},
    {question:"檢查的拼音", answer:"jian3cha2" , category:"pinyin"},
    {question:"檢查的英文", answer:"inspect", category:"english"},
    {question:"emit的中文", answer:"排放", category:"character"},
    {question:"襲擊的英文", answer:"surprise attack", category:"english"},
    {question:"襲擊的拼音", answer:"xi2ji1", category:"pinyin"},
    {question:"槍的書面語", answer:"槍支", category:"character"}
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(-1);

  const nextQuestion = () => {
    setPreviousQuestionIndex(currentQuestionIndex);
    if (flashcards.length > 1) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * flashcards.length);
      } while (randomIndex === currentQuestionIndex);
  
      setCurrentQuestionIndex(randomIndex);
    }
  };

  const previousQuestion = () => {
    if (previousQuestionIndex !== -1) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  return (
    <div className="App">
      <h1>Chinese Flashcards</h1>
      <h2>Flashcards to make studying Chinese easier</h2>
      <h3>Blue cards are for character, Green cards are for pinyin, Red cards are for English translation</h3>
      <h3>12 total cards</h3>
      <Flashcard
        question={flashcards[currentQuestionIndex].question}
        answer={flashcards[currentQuestionIndex].answer}
        category={flashcards[currentQuestionIndex].category}
        image={flashcards[currentQuestionIndex].image}
      />

      <div className="navigation">
        <button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous Question</button>
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    </div>
  );
}

export default App;
