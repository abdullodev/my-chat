import React, { useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useEffect } from "react";

const Message = ({ m }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [m]);
  return (
    <div className="message" ref={ref}>
      <div className="message_action">
        <IconButton className="message_icon_box" color="primary">
          <AiOutlineEdit className="icon_m_edit icon" />
        </IconButton>
        <IconButton className="message_icon_box" color="primary">
          <MdDeleteOutline className="icon_m_delete icon" />
        </IconButton>
      </div>
      <div className="message_text">{m.text}</div>
    </div>
  );
};

export default Message;
