import React, { useState } from "react";
import styled from "styled-components";
import ValidModel from "./ValidModel";
function Project({ project, user }) {
  const [openValidModel, setOpenValidModel] = useState(false);
  const handleClick = () => {
    if (user) setOpenValidModel(true);
    else {
      alert("Vui lòng đăng nhập!");
    }
  };
  return (
    <div>
      <ValidModel
        openValidModel={openValidModel}
        setOpenValidModel={setOpenValidModel}
        project={project}
      />
      <HommeScreenMainElement onClick={handleClick}>
        <p>{project.projectName}</p>
        <ElementCotent>
          <img src={project.projectCreatorAvatar} alt="avatar" />
          <ElementDay>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>{project.createdAt?.split("T")[0]}</span>
          </ElementDay>
        </ElementCotent>
      </HommeScreenMainElement>
    </div>
  );
}

export default Project;
const HommeScreenMainElement = styled.div`
  padding: 10px;
  -webkit-box-shadow: 6px 6px 8px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 6px 6px 8px 0px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: #3480eb;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in;
  p {
    font-size: 18px;
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.03);
  }
`;
const ElementCotent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
`;
const ElementDay = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 2px;
  }
`;
