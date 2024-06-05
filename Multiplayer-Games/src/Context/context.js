import { createContext, useContext } from "react";

export const gameNameContext = createContext({
    gameName : "",
    roomName: "",
    // addTodo: () => {},
    updateGameName: () => {},
    updateRoomName:()=>{},
})

export const useGameName = ()=>{
    return useContext(gameNameContext)
}

export const GameNameProvider = gameNameContext.Provider