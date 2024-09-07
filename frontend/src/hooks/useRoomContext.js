import { RoomsContext } from "../context/RoomContext"
import { useContext } from "react"

export const useRoomContext = () => {
  const context = useContext(RoomsContext)

  if(!context) {
    throw Error('useRoomContext must be used inside an RoomsContextProvider')
  }

  return context
}