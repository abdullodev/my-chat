import React, { useState } from "react";
import Chats from "../../components/Chats";
import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="home">
      <div
        className={isMenu || isEdit ? "sidebar_back active" : "sidebar_back"}
        onClick={() => setIsMenu(false)}
      ></div>
      <div className="home_container">
        <div
          className={isMenu ? "sidebar_container active" : "sidebar_container"}
        >
          <Sidebar
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setIsMenu={setIsMenu}
          />
        </div>
        <div className="chats_container">
          <Chats setIsMenu={setIsMenu} />
        </div>
        <div className="messages_container">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;
