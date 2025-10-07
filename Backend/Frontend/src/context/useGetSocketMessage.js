// import React, { useEffect } from "react";
// import { useSocketContext } from "./SocketContext";
// import useConversation from "../zustand/useConversation.js";
// import sound from "../assets/notification.mp3";
// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessage } = useConversation();

//   useEffect(() => {
//     socket.on("newMessage", (newMessage) => {
//       const notification = new Audio(sound);
//       notification.play();
//       setMessage([...messages, newMessage]);
//     });
//     return () => {
//       socket.off("newMessage");
//     };
//   }, [socket, messages, setMessage]);
// };
// export default useGetSocketMessage;

import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";


const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, addMessage } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      try {
        const notification = new Audio(sound);
        notification.play();
      } catch (err) {
        // ignore autoplay errors
      }

      // normalize ids
      const senderId = newMessage?.senderId?._id || newMessage?.senderId;
      const receiverId = newMessage?.receiverId?._id || newMessage?.receiverId;
      const selectedId = selectedConversation?._id;

      // If the message belongs to the open chat, append it
      if (selectedId && (String(senderId) === String(selectedId) || String(receiverId) === String(selectedId))) {
        addMessage(newMessage);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, addMessage]);
};

export default useGetSocketMessage;
