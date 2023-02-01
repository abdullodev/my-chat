import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { VscSplitHorizontal } from "react-icons/vsc";
import { IoMdSend } from "react-icons/io";
import { Button, IconButton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import Message from "./Message";

const Messages = ({ oneUser, chatId }) => {
  const [allTexts, setAllTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const messageForm = async (e) => {
    e.preventDefault();

    const idOfMessage = uuidv4();

    let data = {
      id: idOfMessage,
      text: message,
    };

    try {
      if (message) {
        await updateDoc(doc(db, "userChats", chatId), {
          allTexts: arrayUnion(data),
        });
        setMessage("");
      } else {
        alert("Please enter some text!");
      }
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    const getChat = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(db, "userChats", chatId), (doc) => {
        setAllTexts(doc.data());
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    };

    chatId && getChat();
  }, [chatId]);

  return (
    <>
      <div className="message_header">
        <div className="message_username">{oneUser.username}</div>
        <div className="message_header_icons">
          <IconButton className="message_icon_box" color="primary">
            <AiOutlineSearch className="icon" />
          </IconButton>
          <IconButton className="message_icon_box" color="primary">
            <FiPhone className="icon" />
          </IconButton>
          <IconButton className="message_icon_box" color="primary">
            <VscSplitHorizontal className="icon" />
          </IconButton>
          <IconButton className="message_icon_box" color="primary">
            <BiDotsVerticalRounded className="icon" />
          </IconButton>
        </div>
      </div>

      <div className="message_content">
        {Object.values(allTexts)[0] !== undefined &&
        Object.values(allTexts)[0].length !== 0 ? (
          Object.values(allTexts)[0].map((m) => <Message m={m} key={m.id} />)
        ) : (
          <div className="no_message_in_chat" onClick={() => setMessage("👋")}>
            👋
          </div>
        )}
      </div>

      <div className="message_input_box">
        <form className="message_form" onSubmit={messageForm}>
          <div className="message_input">
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button type="submit" className="message_input_icons">
            <IoMdSend className="send_icon" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default Messages;
