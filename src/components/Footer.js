import React from "react";
import styled from "styled-components";
function Footer() {
  return (
    <Container>
      <p>
        Copyright 2021 @<a href="https://www.facebook.com/page.ailab">AILAB</a>
      </p>
      <img
        src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/158164145_215338803672391_9072952637420078797_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fRndwXI0KI8AX_RQZZz&_nc_ht=scontent.fsgn8-1.fna&oh=455d09d27bc9420946c5e78460e571eb&oe=618F77C5"
        alt="logo"
        loading="lazy"
      />
    </Container>
  );
}

export default Footer;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
  background-color: #3480eb;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-left: 4px;
  }
`;
