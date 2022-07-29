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

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return(
      <p>{text} {value} %</p>
    )
  }

  return (
    <p>{text} {value}</p>
  )
}
// I had already defined the component Statistics

const Statistics = ({
  goodClicks,
  neutralClicks,
  badClicks
  }
  ) => {
  const total = (goodClicks + neutralClicks + badClicks);
  const average = total > 0 ? (goodClicks + (badClicks * -1)) / total : 0;
  const positives = total > 0 ? (goodClicks / total) * 100 : 0;

  if (total === 0 ){
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <div>
      <StatisticLine text="good" value={goodClicks} />
      <StatisticLine text="neutral" value={neutralClicks} />
      <StatisticLine text="bad" value={badClicks} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positives} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <Header text="statistics"/>
      <Statistics 
        goodClicks={good}
        neutralClicks={neutral}
        badClicks={bad}
      />
    </div>
  )
}

export default App