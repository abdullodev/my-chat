import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import Chats from "../../components/Chats";
import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";

const Home = () => {
  const [oneUser, setOneUser] = useState(null);
  const [chatId, setChatId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const getOneUser = async (id) => {
    setChatId(id);
    const valueOfselected = doc(db, "contacts", id);

    const user = await getDoc(valueOfselected);
    if (user.exists()) {
      let data = user.data();
      setOneUser(data);
    } else {
      console.log("No such document!");
    }
  };

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
          <Chats setIsMenu={setIsMenu} getOneUser={getOneUser} />
        </div>
        <div className="messages_container">
          {oneUser !== null ? (
            <Messages oneUser={oneUser} chatId={chatId} />
          ) : (
            <div className="default_message_box">Select user for chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
