import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Loading from "./Loading";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MessageIcon from "@mui/icons-material/Message";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button } from "@mui/material";

const Chats = ({ setIsMenu, getOneUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  async function getUser() {
    const data = [];

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "contacts"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        let allData = data.filter((d) => d.uid !== auth.currentUser.uid);
        setUsers(allData);
      });
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="chat_menu_container">
        <div className="menu_icons">
          <div className="menu_icon menu">
            <Button className="icon_box" onClick={() => setIsMenu(true)}>
              <MenuIcon className="realy_menu_icon" />
            </Button>
          </div>

          <div className="menu_icon menu_first">
            <Button className="icon_box">
              <MessageIcon />
              <div className="menu_title">Chats</div>
            </Button>
          </div>

          <div className="menu_icon">
            <Button className="icon_box">
              <FolderSpecialIcon />
              <div className="menu_title">Channel</div>
            </Button>
          </div>

          <div className="menu_icon">
            <Button className="icon_box">
              <GroupIcon />
              <div className="menu_title">Group</div>
            </Button>
          </div>

          <div className="menu_icon">
            <Button className="icon_box">
              <PersonOutlineIcon />
              <div className="menu_title">User</div>
            </Button>
          </div>

          <div className="menu_icon">
            <Button className="icon_box">
              <SmartToyIcon />
              <div className="menu_title">Bot</div>
            </Button>
          </div>

          <div className="menu_icon">
            <Button className="icon_box">
              <BorderColorIcon />
              <div className="menu_title">Edit</div>
            </Button>
          </div>
        </div>
      </div>
      <div className="chat_side">
        <div className="chat_header">
          <div className="chat_search_input">
            <input type="text" placeholder="Search" />
          </div>
          <div className="chat_lock_icon">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              className="icon_box"
            >
              <LockOpenIcon />
            </IconButton>
          </div>
        </div>

        <div className="chat_content">
          {!isLoading ? (
            users.map((user, index) => (
              <Chat key={index} user={user} getOneUser={getOneUser} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Chats;
