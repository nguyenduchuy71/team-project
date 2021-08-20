import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Project from "../components/Project";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
function HomeScreen() {
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [user] = useAuthState(auth);
  const fetchData = () => {
    db.collection("projects").onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListProject(items);
    });
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  const handleOpenModel = () => {
    setOpenModel(!openModel);
  };
  return (
    <HomeScreenContainer>
      <HomeScreenHead>
        <p>Projects</p>
        <HommeScreenHeadButton>
          {openModel ? (
            <>
              <ion-icon name="close-circle-outline"></ion-icon>
              <span onClick={handleOpenModel}>Close</span>
            </>
          ) : (
            <>
              <ion-icon name="add-circle-outline"></ion-icon>
              <span onClick={handleOpenModel}>New Project</span>
            </>
          )}
        </HommeScreenHeadButton>
      </HomeScreenHead>
      {openModel && <Modal user={user} db={db} setOpenModel={setOpenModel} />}
      <HommeScreenMain>
        {listProject?.map((project) => (
          <Project key={project?.id} project={project} user={user} />
        ))}
      </HommeScreenMain>
    </HomeScreenContainer>
  );
}

export default HomeScreen;
const HomeScreenContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;
const HomeScreenHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
  }
`;
const HommeScreenHeadButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #3480eb;
  padding: 10px;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 4px;
  span {
    margin-left: 2px;
  }
  ion-icon {
    font-size: 16px;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.8;
  }
`;
const HommeScreenMain = styled.div`
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
