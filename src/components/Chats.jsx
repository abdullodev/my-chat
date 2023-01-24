import React from "react";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineWechat } from "react-icons/ai";
import { TbFolder } from "react-icons/tb";
import { MdOutlineEditRoad } from "react-icons/md";
import { HiOutlineLockOpen } from "react-icons/hi";

const Chats = ({ setIsMenu }) => {
  return (
    <>
      <div className="chat_menu_container">
        <div className="menu_icons">
          <div className="menu_icon menu" onClick={() => setIsMenu(true)}>
            <IoIosMenu className="icon" />
          </div>

          <div className="menu_icon menu_first">
            <AiOutlineWechat className="icon" />
            <div className="menu_title">Chats</div>
          </div>

          <div className="menu_icon">
            <TbFolder className="icon" />
            <div className="menu_title">Channel</div>
          </div>

          <div className="menu_icon">
            <TbFolder className="icon" />
            <div className="menu_title">Group</div>
          </div>

          <div className="menu_icon">
            <TbFolder className="icon" />
            <div className="menu_title">User</div>
          </div>

          <div className="menu_icon">
            <TbFolder className="icon" />
            <div className="menu_title">Bot</div>
          </div>

          <div className="menu_icon">
            <MdOutlineEditRoad className="icon" />
            <div className="menu_title">Edit</div>
          </div>
        </div>
      </div>
      <div className="chat_side">
        <div className="chat_header">
          <div className="chat_search_input">
            <input type="text" placeholder="Search" />
          </div>
          <div className="chat_lock_icon">
            <HiOutlineLockOpen className="icon" />
          </div>
        </div>

        <div className="chat_content">
          <div className="chat">
            <div className="chat_img">
              <img
                src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                alt="user"
                height="40px"
              />
            </div>
            <div className="chat_username">Abdullo</div>
            <div className="chat_time">12:21</div>
          </div>
          <div className="chat">
            <div className="chat_img">
              <img
                src="https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="user"
                height="40px"
              />
            </div>
            <div className="chat_username">Mansur</div>
            <div className="chat_time">12:21</div>
          </div>
          <div className="chat">
            <div className="chat_img">
              <img
                src="https://cdn.wallpapersafari.com/62/44/CRVXEL.jpg"
                alt="user"
                height="40px"
              />
            </div>
            <div className="chat_username">Dilshod</div>
            <div className="chat_time">12:21</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
