import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLogOut } from "../redux/userSlice";
function Header() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(userLogOut());
  };
  const { isLoading, user } = useSelector((state) => state.user);
  useEffect(() => {}, [isLoading]);
  return (
    <HeaderContainer>
      <Link to="/">
        <ImgaeLogo src="./logo.png" alt="logo" loading="lazy" />
      </Link>
      <MenuContent>
        {user.img ? (
          <>
            <AvatarUser src={user?.img} alt="avatar" loading="lazy" />
            <ion-icon name="log-in-outline" onClick={signOut}></ion-icon>
          </>
        ) : (
          <LoginContent>
            <Link to="/login">
              <IconContent>
                <img src="./enter.png" alt="icon" loading="lazy" />
              </IconContent>
            </Link>
          </LoginContent>
        )}
      </MenuContent>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  padding: 4px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3480eb;
`;
const ImgaeLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const MenuContent = styled.div`
  display: flex;
  align-items: center;
  ion-icon {
    width: 26px;
    height: 26px;
    margin-left: 2px;
    cursor: pointer;
    color: #fff;
    transition: all 0.25s ease-in;
    &:hover {
      opacity: 0.7;
    }
  }
`;
const AvatarUser = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  flex-shrink: 0;
`;

const LoginContent = styled.div`
  display: flex;
  align-items: stretch;
  padding: 4px 8px;
  border-radius: 4px;
  color: initial;
  cursor: pointer;
  transition: all 0.25s ease-in;
  &:hover {
    opacity: 0.7;
  }
`;
const IconContent = styled.div`
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  padding: 6px;
  img {
    height: 26px;
    width: 26px;
    object-fit: cover;
  }
`;
export default Header;
