import { Link,useNavigate } from "react-router-dom";
import "./JoinCreateRoom.css";
import { useGameName } from "../Context";
import { useState } from "react";

function JoinCreateRoom() {
  let { gameName,updateRoomName } = useGameName();
  gameName = "../" + gameName;
  let [roomName,setRoomName] = useState("");
  const navigate = useNavigate();
  updateRoomName("");

  function handleJoin(){
    if (roomName.trim() === "") return;
    updateRoomName(roomName);
    navigate(gameName);
    // navigate(gameName, { state: { data: roomName } });
  }

  return (
    <div className="roomBox">
      <div className="roomContainer">
        <h1>Room</h1>
        <div className="row">
          {/* Join Room */}
          <div className="col">
            <div className="card-body">
              <h3 className="card-title">Join a Room</h3>
              <form className="joinRoom">
                <label htmlFor="roomId" className="form-label">Room ID:</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="form-control"
                  id="roomId"
                  placeholder="Enter Room ID"
                  required
                />
                <button onClick={handleJoin} className="btn btn-primary">Join</button>
              </form>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="vertical-line"></div>

          {/* Create Room */}
          <div className="col">
            <div className="card-body">
              <h3 className="card-title">Create a Room</h3>
              <Link to={gameName} className="btn btn-success">Create</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCreateRoom;
