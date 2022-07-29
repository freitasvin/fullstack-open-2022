import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

// I had already defined the component Statistics

const Statistics = ({
  header, 
  feedbacks,
  goodClicks,
  neutralClicks,
  badClicks
  }
  ) => {
  const total = (goodClicks + neutralClicks + badClicks);
  const average = total > 0 ? (goodClicks + (badClicks * -1)) / total : 0;
  const positives = total > 0 ? (goodClicks / total) * 100 : 0;

  return(
    <div>
      <h1>{header}</h1>
      <p>{feedbacks[0]} {goodClicks}</p>
      <p>{feedbacks[1]} {neutralClicks}</p>
      <p>{feedbacks[2]} {badClicks}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positives} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbacks = ["good", "neutral", "bad"];

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback"/>
      <Button text={feedbacks[0]} handleClick={handleGoodClick}/>
      <Button text={feedbacks[1]} handleClick={handleNeutralClick}/>
      <Button text={feedbacks[2]} handleClick={handleBadClick}/>
      <Statistics 
        header="statistics" 
        feedbacks={feedbacks}
        goodClicks={good}
        neutralClicks={neutral}
        badClicks={bad}
      />
    </div>
  )
}

export default App