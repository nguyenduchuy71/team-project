import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React, { useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function DraggableElement({ prefix, elements, id }) {
  const [user] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleAddTask = () => {
    db.collection("tasks").doc(id).collection(prefix).add({
      content: input,
      userEmail: user?.email,
      userImage: user?.photoURL,
      timestamp: new Date().toISOString(),
    });
    setOpenModal(false);
  };
  return (
    <DroppableStyles>
      <ColumnHeader>
        <span>{prefix}</span>
        <ion-icon
          name={openModal ? "close-circle-outline" : "add-circle-outline"}
          onClick={handleOpenModal}
        ></ion-icon>
      </ColumnHeader>
      {openModal && (
        <ModelContent>
          <input
            type="text"
            placeholder="Nhập nội dung"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAddTask}>Xác nhận</button>
        </ModelContent>
      )}
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements?.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
}
const ColumnHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    text-transform: uppercase;
    font-weight: bold;
  }
  ion-icon {
    font-size: 20px;
    cursor: pointer;
  }
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;
const ModelContent = styled.div`
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border: 1px solid #fff;
  margin-bottom: 10px;
  input {
    margin-bottom: 10px;
    outline: none;
    height: 20px;
    border-radius: 4px;
    padding: 4px;
    font-size: 16px;
    border: none;
  }
  button {
    border: none;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  }
`;
export default React.memo(DraggableElement);
