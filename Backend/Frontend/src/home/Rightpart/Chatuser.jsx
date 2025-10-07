import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../../public/user.jpg";
function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // console.log(selectedConversation.fullname);
  return (
  <div className="relative flex items-center h-[8%] justify-center gap-4 bg-base-200 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        style={{ opacity: 0.7 }}
      >
  <CiMenuFries className="text-xl text-base-content" style={{ color: 'inherit' }} />
      </label>
  <div className="flex space-x-3 items-center justify-center h-[8vh] duration-300">
        <div className="avatar">
          <div className="w-14 rounded-full relative">
            <img src={profile} />
            {onlineUsers.includes(selectedConversation._id) && (
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-base-200 rounded-full"></span>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
