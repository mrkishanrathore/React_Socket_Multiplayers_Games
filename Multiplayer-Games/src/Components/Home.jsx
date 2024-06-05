import GameCard from "./GameCard"
import "./Home.css";
import TTTImg from "../assets/TTTImg.webp"
import Snake from "../assets/Snake.jpg"

function Home() {
  return (
    <div className="homeContainer">
      <h2> Games </h2>

      <div className="cardarea">
        <GameCard image={TTTImg} title="Tic Tac Toe" game="TTT" description="This is the simple game of Tic tac toe"/>
        <GameCard image={Snake} title="Snake" game="Snake" description="This is the Classic Snake game."
        />
        <GameCard image={TTTImg} title="Tic Tac Toe" game="TTT" description="This is the simple game of Tic tac toe"/>
        <GameCard image={Snake} title="Snake" game="Snake" description="This is the Classic Snake game."
        />
        <GameCard image={TTTImg} title="Tic Tac Toe" game="TTT" description="This is the simple game of Tic tac toe"/>
        <GameCard image={Snake} title="Snake" game="Snake" description="This is the Classic Snake game."
        />
        <GameCard image={TTTImg} title="Tic Tac Toe" game="TTT" description="This is the simple game of Tic tac toe"/>
        <GameCard image={Snake} title="Snake" game="Snake" description="This is the Classic Snake game."
        />
      </div>
      
    </div>
  )
}

export default Home
