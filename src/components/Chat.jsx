import React from "react";
import { Button } from "@mui/material";

const Chat = ({ user, getOneUser }) => {
  // const { setOneUser } = useContext(AuthContext);

  return (
    <Button
      variant="outlined"
      className="chat"
      onClick={() => getOneUser(user.uid)}
    >
      <div className="chat_img">
        <div className="img"></div>
      </div>
      <div className="chat_username">{user.username}</div>
      <div className="chat_time">{user.date}</div>
    </Button>
  );
};

export default Chat;
