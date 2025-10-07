import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),
//   messages: [],
//   setMessage: (messages) => set({ messages }),
// }));
// export default useConversation;

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessage: (messages) => set({ messages }),
  
  // ✅ add this helper for adding a single message
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useConversation;

