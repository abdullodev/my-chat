import React, { useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useEffect } from "react";

const Message = ({ m, setIsDelete, setIdOfDeleted, updateItem, refOther }) => {
  const ref = useRef();

  const deleteItem = (id) => {
    setIsDelete(true);
    setIdOfDeleted(id);
  };

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [m]);

  return (
    <>
      <div className="message" ref={ref}>
        <div className="message_action">
          <IconButton
            className="message_icon_box"
            color="primary"
            onClick={() => {
              updateItem(m);
              refOther.current.focus();
            }}
          >
            <AiOutlineEdit className="icon_m_edit icon" />
          </IconButton>
          <IconButton
            className="message_icon_box"
            color="primary"
            onClick={() => deleteItem(m.id)}
          >
            <MdDeleteOutline className="icon_m_delete icon" />
          </IconButton>
        </div>
        <div className="message_text">{m.text}</div>

        <div className="message_img_box">
          <div className="message_img"></div>
          <div className="message_displayName">{m.user}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
