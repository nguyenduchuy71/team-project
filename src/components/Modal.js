import React, { useState } from "react";
import styled from "styled-components";
const initialState = {
  projectName: "",
  projectPassword: "",
};
function Modal({ user, db, setOpenModel }) {
  const [formProject, setFormProject] = useState(initialState);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("projects")
        .add({
          createdAt: new Date().toISOString(),
          projectName: formProject.projectName,
          projectPassword: formProject.projectPassword,
          projectCreatorName: user?.email,
          projectCreatorAvatar: user?.photoURL,
        })
        .then(function (docRef) {
          alert("Taọ project thành công");
          console.log(docRef?.id);
        })
        .catch(function (error) {
          alert("Có lỗi xảy ra vui lòng thử lại ");
          console.log(error);
        });
      setOpenModel(false);
    } else {
      alert("Vui lòng đăng nhập trước khi tạo");
    }
  };
  const handleChange = (e) => {
    setFormProject({ ...formProject, [e.target.name]: e.target.value });
  };
  return (
    <ModelContent>
      <FormContent onSubmit={handleSubmitForm}>
        <input
          name="projectName"
          type="text"
          placeholder="Tên project"
          onChange={handleChange}
          required
        />
        <input
          name="projectPassword"
          type="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
        />
        <button type="submit">Xác nhận</button>
      </FormContent>
    </ModelContent>
  );
}
const ModelContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 18px;
    width: 240px;
    padding: 8px 10px;
    outline: none;
  }
  button {
    width: 100px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: #3480eb;
    color: #fff;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export default Modal;
