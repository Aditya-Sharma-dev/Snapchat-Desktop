import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { ChatBubble, RadioButtonUnchecked, Search } from "@material-ui/icons";
import { auth, db } from "./firebase";
import Chat from "./Chat.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";
function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const takePic = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats_avatar"
        />
        <div className="chats_search">
          <Search className="searchicon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats_chatIcon" />
      </div>
      <div className="chat_posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, read, imageUrl, timestamp },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              imageUrl={imageUrl}
              timestamp={timestamp}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUnchecked className="takesnap" onClick={takePic} />
    </div>
  );
}

export default Chats;
