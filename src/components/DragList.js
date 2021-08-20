import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { db } from "../firebase";

const DragDropContextContainer = styled.div`
  padding-right: 4px;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

function DragList({ id }) {
  const [elements, setElements] = useState();
  const [loading, setloading] = useState(true);
  const fetchTasks = async () => {
    const listTodo = [];
    const listInProgress = [];
    const listDone = [];
    await db
      .collection("tasks")
      .doc(id)
      .collection("todo")
      .orderBy("timestamp", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listTodo.push({ id: doc.id, ...doc.data() });
        });
      });
    await db
      .collection("tasks")
      .doc(id)
      .collection("inProgress")
      .orderBy("timestamp", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listInProgress.push({ id: doc.id, ...doc.data() });
        });
      });
    await db
      .collection("tasks")
      .doc(id)
      .collection("done")
      .orderBy("timestamp", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listDone.push({ id: doc.id, ...doc.data() });
        });
      });
    setElements({
      todo: listTodo,
      inProgress: listInProgress,
      done: listDone,
    });
    setloading(false);
  };
  useEffect(() => {
    fetchTasks();
  }, [loading]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      {!loading ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {lists.map((listKey) => (
              <DraggableElement
                elements={elements[`${listKey}`]}
                key={listKey}
                prefix={listKey}
                id={id}
              />
            ))}
          </ListGrid>
        </DragDropContext>
      ) : (
        <></>
      )}
    </DragDropContextContainer>
  );
}

export default DragList;
