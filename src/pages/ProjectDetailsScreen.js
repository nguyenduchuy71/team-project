import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../components/Message";
import Member from "../components/Member";
import DragList from "../components/DragList";
import { useDispatch } from "react-redux";
function ProjectDetailsScreen(props) {
  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [user] = useAuthState(auth);
  const [project, setProject] = useState();
  const history = useHistory();
  const [roomMessages, loading] = useCollection(
    id &&
      db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const fetchData = () => {
    db.collection("projects")
      .doc(id)
      .get()
      .then((snapshot) => {
        setProject(snapshot.data());
      });
  };
  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      history.push("/");
    }
    chatRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [user, loading]);
  return (
    <ProjectDetailsContainer>
      <ProjectDetailsTaskBoardContent>
        <TaskBoardHead>
          <p>{project?.projectName}</p>
          <TaskBoarTime>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{project?.createdAt.split("T")[0]}</span>
          </TaskBoarTime>
        </TaskBoardHead>
        <TaskBoardMain>
          <DragList id={id} />
        </TaskBoardMain>
      </ProjectDetailsTaskBoardContent>
      <ProjectDetailsGroupChatContent>
        <MemberGroup>
          <p>Số lượng thành viên (10)</p>
          <ListMember>
            <Member />
          </ListMember>
        </MemberGroup>
        <GroupChat>
          <p>Group Chat</p>
          <GroupChatContent id="chat">
            <ListChat>
              {roomMessages?.docs.map((doc) => {
                const { message, timestamp, userEmail, userImage } = doc.data();
                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    userEmail={userEmail}
                    userImage={userImage}
                  />
                );
              })}
              <ChatBottom ref={chatRef} />
            </ListChat>
          </GroupChatContent>
          <ChatInput id={id} ref={chatRef} />
        </GroupChat>
      </ProjectDetailsGroupChatContent>
    </ProjectDetailsContainer>
  );
}

const ProjectDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const ProjectDetailsTaskBoardContent = styled.div`
  flex: 2;
  width: 100%;
  border-right: 1px solid #ccc;
`;
const ProjectDetailsGroupChatContent = styled.div`
  flex: 1;
  width: 100%;
`;
const TaskBoardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: bold;
  }
`;
const TaskBoarTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  span {
    margin-left: 2px;
    font-size: 16px;
  }
`;
const MemberGroup = styled.div`
  width: 100%;
  padding: 2px 8px;
`;
const ListMember = styled.div`
  display: flex;
  align-items: center;
`;
const GroupChat = styled.div`
  padding: 8px;
  p {
    font-size: 18px;
    font-weight: bold;
  }
`;
const GroupChatContent = styled.div`
  width: 100%;
  padding: 0 8px;
  height: 340px;
  margin: 0 auto;
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: 4px;
`;
const ListChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`;
const ChatBottom = styled.div`
  padding-bottom: 20px;
`;
const TaskBoardMain = styled.div`
  margin-top: 20px;
`;
export default ProjectDetailsScreen;
