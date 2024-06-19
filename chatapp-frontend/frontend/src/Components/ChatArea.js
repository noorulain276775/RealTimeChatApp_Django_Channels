import React from "react";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";

export const ChatArea = () => {
  return (
    <div className="chat-area">
      <div className="chat-header"></div>
      <div className="messages">
        <Message text="Hey, How is it going" sent />
        <Message text="Yes, I am good" received />
      </div>
      <MessageInput />
    </div>
  );
};
