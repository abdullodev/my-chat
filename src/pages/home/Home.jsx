import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Chats from "../../components/Chats";
import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

const Home = () => {
  const [oneUser, setOneUser] = useState(null);
  const [chatId, setChatId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [message, setMessage] = useState("");

  const getOneUser = async (id) => {
    setChatId(id);
    setMessage("");
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
        className={
          isMenu || isEdit || isClear || isDelete
            ? "sidebar_back active"
            : "sidebar_back"
        }
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
            <Messages
              oneUser={oneUser}
              chatId={chatId}
              isClear={isClear}
              setIsClear={setIsClear}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              message={message}
              setMessage={setMessage}
            />
          ) : (
            <div className="default_message_box">Select user for chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
