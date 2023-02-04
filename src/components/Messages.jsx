import React, { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { VscSplitHorizontal } from "react-icons/vsc";
import { IoMdSend } from "react-icons/io";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  deleteField,
  arrayRemove,
} from "firebase/firestore";
import { AiOutlineClear, AiOutlineLogout } from "react-icons/ai";
import { BsFillMicMuteFill, BsCheck2 } from "react-icons/bs";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import Message from "./Message";
import Fade from "@mui/material/Fade";
import { signOut } from "firebase/auth";

const Messages = ({
  oneUser,
  chatId,
  isClear,
  setIsClear,
  isDelete,
  setIsDelete,
  message,
  setMessage,
}) => {
  const [idOfDeleted, setIdOfDeleted] = useState("");
  const [allTexts, setAllTexts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const messageForm = async (e) => {
    e.preventDefault();

    const idOfMessage = uuidv4();

    let data = {
      id: idOfMessage,
      text: message,
      user: auth.currentUser.displayName,
    };

    try {
      if (!isEdit) {
        if (message) {
          await updateDoc(doc(db, "userChats", chatId), {
            allTexts: arrayUnion(data),
          });
          setMessage("");
        } else {
          toast.warn("Please enter some text!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        let edited = Object.values(allTexts)[0].map((a) => {
          if (a.id === editedItem) {
            a.text = message;

            return a;
          }

          return a;
        });

        if (message) {
          await updateDoc(doc(db, "userChats", chatId), {
            allTexts: edited,
          });

          setMessage("");
          setIsEdit(false);
          toast.success("Successfully updated message !", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warn("Please enter some text for updating!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const defaultChatClick = async () => {
    const idOfMessage = uuidv4();

    let data = {
      id: idOfMessage,
      text: "👋",
      user: auth.currentUser.displayName,
    };

    await updateDoc(doc(db, "userChats", chatId), {
      allTexts: arrayUnion(data),
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const clearData = async () => {
    setIsClear(false);
    await updateDoc(doc(db, "userChats", chatId), {
      allTexts: deleteField(),
    });
    setMessage("");
    setIsEdit(false);
  };

  const deleteData = async () => {
    const filtered = Object.values(allTexts)[0].find(
      (a) => a.id === idOfDeleted
    );
    setIsDelete(false);

    await updateDoc(doc(db, "userChats", chatId), {
      allTexts: arrayRemove(filtered),
    });
    toast("Deleted item");
    setMessage("");
    setIsEdit(false);
  };

  const updateItem = (item) => {
    let elem = item.text;
    setMessage(elem);
    setIsEdit(true);
    setEditedItem(item.id);
  };

  const getChat = () => {
    const unsub = onSnapshot(doc(db, "userChats", chatId), (doc) => {
      setAllTexts(doc.data());
    });

    return () => {
      unsub();
    };
  };
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
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
          <div className="message_icon_box">
            <IconButton
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="three_dot_in_chat"
            >
              <BiDotsVerticalRounded className="icon" />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              className="message_top_menu"
            >
              <MenuItem onClick={handleClose}>
                <BsFillMicMuteFill className="icons_message_top" />
                Mute
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setIsClear(true);
                }}
              >
                <AiOutlineClear className="icons_message_top" />
                Clear All
              </MenuItem>
              <MenuItem onClick={() => signOut(auth)}>
                <AiOutlineLogout className="icons_message_top" />
                Log out
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="message_content">
        {Object.values(allTexts)[0] !== undefined &&
          Object.values(allTexts)[0].map((m) => (
            <Message
              m={m}
              key={m.id}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              setIdOfDeleted={setIdOfDeleted}
              updateItem={updateItem}
              refOther={ref}
            />
          ))}

        {(Object.values(allTexts)[0] === undefined ||
          Object.values(allTexts)[0].length === 0) && (
          <div className="no_message_in_chat" onClick={defaultChatClick}>
            <span>👋</span>
          </div>
        )}
      </div>

      <div className="message_input_box ">
        <form className="message_form" onSubmit={messageForm}>
          <div className="message_input">
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={ref}
              autoFocus
            />
          </div>
          <Button type="submit" className="message_input_icons">
            {isEdit ? (
              <BsCheck2 className="send_icon" />
            ) : (
              <IoMdSend className="send_icon" />
            )}
          </Button>
        </form>
      </div>

      <div className={isClear ? "clear_box active" : "clear_box"}>
        <div className="clear_text">Gonna clear all? </div>
        <div className="clear_btns">
          <Button className="not_clear" onClick={() => setIsClear(false)}>
            No
          </Button>
          <Button className="yes_clear" onClick={clearData}>
            Clear
          </Button>
        </div>
      </div>

      <div className={isDelete ? "delete_box active" : "delete_box"}>
        <div className="delete_text">Delete this message?</div>
        <div className="delete_btns">
          <Button className="not_delete" onClick={() => setIsDelete(false)}>
            No
          </Button>
          <Button className="yes_delete" onClick={deleteData}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default Messages;
