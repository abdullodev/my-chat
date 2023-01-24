import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { VscSplitHorizontal } from "react-icons/vsc";
import { BiSmile } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const Messages = () => {
  const [isTyped, setIsTyped] = useState(false);

  const messageForm = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const text = e.target[1].value;

    let data = {
      file,
      text,
    };
    console.log(data);
  };

  return (
    <>
      <div className="message_header">
        <div className="message_username">Abdullo</div>
        <div className="message_header_icons">
          <div className="message_icon_box">
            <AiOutlineSearch className="icon" />
          </div>
          <div className="message_icon_box">
            <FiPhone className="icon" />
          </div>
          <div className="message_icon_box">
            <VscSplitHorizontal className="icon" />
          </div>
          <div className="message_icon_box">
            <BiDotsVerticalRounded className="icon" />
          </div>
        </div>
      </div>

      <div className="message_content">
        <div className="message">
          <div className="message_action">
            <AiOutlineEdit className="icon" />
            <MdDeleteOutline className="icon" />
          </div>
          <div className="message_text">Assalomu aleykum</div>
        </div>
      </div>

      <div className="message_input_box">
        <form className="message_form" onSubmit={messageForm}>
          <div className="message_input">
            <input type="text" placeholder="Write a message" />
          </div>
          <div className="message_input_icons">
            <IoMdSend className="send_icon" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Messages;
