import { Outlet} from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import {GameNameProvider} from '../Context'
import { useState } from "react";

const Layout = () => {
  
  const [gameName, setGameName] = useState("");
  const [roomName, setRoomName] = useState("");

  function updateGameName(name){
    setGameName(name);
  }

  function updateRoomName(room){
    setRoomName(room);
  }

  return (
    <GameNameProvider value={{gameName, roomName, updateGameName,updateRoomName}}>
      <Nav/>
      <Outlet />
      <Footer/>
    </GameNameProvider>
  )
};

export default Layout;