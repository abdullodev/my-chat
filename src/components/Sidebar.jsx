import React, { useContext, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { AiFillFolder } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import { HiOutlineSave } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { MdNightlightRound } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { doc, updateDoc } from "firebase/firestore";

const Sidebar = ({ isEdit, setIsEdit, setIsMenu }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [username, setUsername] = useState("");

  const { user, editContact, logout } = useContext(AuthContext);

  const editUsernameHandle = () => {
    setIsEdit(true);
    setIsMenu(false);
    setUsername(user.displayName);
  };

  const editHandle = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (username !== user.displayName && username !== "") {
        await editContact(username);
        await updateDoc(doc(db, "contacts", auth.currentUser.uid), {
          username,
        });
        setIsEdit(false);
        setIsLoading(false);
      } else {
        alert("You didnt change your username");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_img"></div>
        <div className="sidebar_down_icon" onClick={() => setSidebar(!sidebar)}>
          <div className="header_name">{user.displayName}</div>
          <BsChevronDown className={sidebar ? "icon active" : "icon"} />
        </div>
      </div>
      <div className="sidebar_content">
        <div className="sidebar_header_hidden">
          <Button variant="outlined" className="siderbar_user_box">
            <div className="user_img_box"></div>
            <div>{user.displayName}</div>
          </Button>

          <Button variant="outlined" className="siderbar_user_box">
            <IoAddCircleSharp className="icon" />
            <div>Add account</div>
          </Button>
        </div>

        <div className={sidebar ? "sidebar_nav active" : "sidebar_nav"}>
          <ul>
            <li onClick={() => setIsMenu(false)}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <FiUsers className="icon" />
                <div>New Group</div>
              </Button>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <AiFillFolder className="icon" />
                <div>New Channel</div>
              </Button>
            </li>
            <li onClick={editUsernameHandle}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <FiUser className="icon" />
                <div>Edit Username</div>
              </Button>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <IoMdCall className="icon" />
                <div>Calls</div>
              </Button>
            </li>
            <li>
              <Button variant="outlined" className="sidebar_nav_btn">
                <HiOutlineSave className="icon" />
                <div>Saved Messages</div>
              </Button>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <IoIosSettings className="icon" />
                <div>Settings</div>
              </Button>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <MdNightlightRound className="icon" />
                <div>Night Mode</div>
              </Button>
            </li>

            <li onClick={() => logout()}>
              <Button variant="outlined" className="sidebar_nav_btn">
                <RiLogoutCircleRLine className="icon" />
                <div>Logout</div>
              </Button>
            </li>
          </ul>
          <div className="sidebar_bottom">
            <div className="bottom_title">Telegram Desktop</div>
            <div className="bottom_version">Version 4.2.4 x64 - About</div>
          </div>
        </div>
      </div>

      <div className={isEdit ? "un_edit_form active" : "un_edit_form"}>
        <div className="un_box">
          <div className="un_edit_header">
            <h3>Edit Username</h3>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => setIsEdit(false)}
            >
              <CloseIcon className="un_close_btn" />
            </IconButton>
          </div>
          <form className="un_form" onSubmit={editHandle}>
            <TextField
              id="outlined-number"
              label="Username"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button type="submit" className="un_edit_btn">
              {!isLoading ? "Edit" : "Loading..."}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
