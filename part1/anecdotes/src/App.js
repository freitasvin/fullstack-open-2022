import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Content = ({anecdote, votes}) => {
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleAnecdoteClick = () => {
    let arrayPosition = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayPosition)
  }
  const handleVoteClick = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    if (votes[selected] >= votes[mostVoted]){
      setMostVoted(selected);
    }

  }

  return (
    <div>
      <div>
        <Header text="Anecdote of the day" />
        <Content anecdote={anecdotes[selected]} votes={votes[selected]} />
        <Button text="vote" handleClick={handleVoteClick}/>
        <Button text="next anecdote" handleClick={handleAnecdoteClick}/>
      </div> 
      <div>
        <Header text="Anecdote with most votes" />
        { votes[mostVoted] > 0 ?
          <Content anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
        :
          <p>no votes yet</p>
        }
      </div>
    </div>
  )
}
export default App