import "./TTT.css";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Chatbox from "../../ChatBox";
import { useGameName } from "../../../Context";

const TTT = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [turn, setTurn] = useState("X");
  const [data, setData] = useState(Array(9).fill(""));
  const [winCombination, setWinCombination] = useState([]);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [playerMark, setPlayerMark] = useState("");

  const { roomName: gameName } = useGameName();
  const roomNameRef = useRef(generateRoomName(gameName));

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("Connected", socketRef.current.id);
      socketRef.current.emit("join-room", roomNameRef.current);
    });
  },[]);

  useEffect(() => {
    socketRef.current.on("receiveMove", (d) => {
      console.log("player moved", d.move);
      const newData = data.map((val, i) => (i === d.move ? turn : val));
      setData(newData);
      setTurn(turn === "X" ? "O" : "X");
      setCount(count + 1);
    });

    socketRef.current.on('playerJoined',()=>{
      socketRef.current.emit("join-room-confirm", roomNameRef.current);
      setPlayerJoined(!playerJoined);
    })
    socketRef.current.on('playerJoinedConfirm',()=>{
      setPlayerJoined(!playerJoined);
    })

    socketRef.current.on("resetGameRequest",()=>{
      if(winCombination?.length === 0){
        alert("You Won!, Opponent reset.");
      }
      resetAccept()
    });

    socketRef.current.on("setTurn",(mark)=>{
      const newMark = (mark == "X"?"O":"X");
      setPlayerMark(newMark)
    })

  }, [data, turn, count, playerJoined,winCombination]);

  useEffect(() => {
    checkWin();
  }, [data]);

  function toggle(num) {
    if (lock || data[num] !== "" || (turn !== playerMark && playerMark !== "")) {
      return;
    }
    if(playerMark === ""){
      setPlayerMark(turn)
      socketRef.current.emit("setOpponentMark",{room:roomNameRef.current,turn:turn});
    }
    const newData = data.map((val, i) => (i === num ? turn : val));
    setData(newData);
    setTurn(turn === "X" ? "O" : "X");
    setCount(count + 1);

    socketRef.current.emit("sendMove", {
      move: num,
      room: roomNameRef.current,
    });
  }

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a], combination);
        return;
      }
    }
  }

  function won(winner, combination) {
    setLock(true);
    setWinCombination(combination);
  }

  function handleReset() {
    socketRef.current.emit("requestReset",roomNameRef.current);
    resetAccept();
  }

  function resetAccept(){
    setData(Array(9).fill(""));
    setTurn("X");
    setCount(0);
    setLock(false);
    setPlayerMark("");
    setWinCombination([]);
  }

  function generateRoomName(gameName) {
    if (!gameName) {
      // Generate random 4 character string
      const randomChars = [...Array(4)]
        .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        .join("");

      return `room${randomChars}`;
    } else {
      return gameName;
    }
  }

  return (
    <div className="containerTTT">
      <h1 className="titleTTT">Tic Tac Toe</h1>
      <div className="gameAreaTTT">
        <div className="boardTTT">
          {data.map((val, index) => (
            <div
              key={index}
              className={`boxTTT ${
                winCombination.includes(index) ? "cyan" : ""
              }`}
              onClick={() => toggle(index)}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="btnReset">
          <div className="messageTTT" id="message">
            <div>RoomID : {roomNameRef.current}</div>
            {playerJoined && <p>Player has Joined</p>}
            {lock ? (
              <>
                Winner is <span>{turn === "X" ? "O" : "X"}</span>
              </>
            ) : (
              <>
                Turn For <span id="turn">{turn}</span>
              </>
            )}
          </div>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>

          {socketRef.current && <Chatbox socket={socketRef} roomName={roomNameRef} />}
        </div>
      </div>
    </div>
  );
};

export default TTT;
