import styled, { keyframes } from 'styled-components';
import {Link } from "react-router-dom";

const spinRight = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  `;

const spinLeft = keyframes`

from {
    transform: rotate(0deg);
}
to {
    transform: rotate(-360deg);
}
` ;

const HeaderContainer = styled.div`
margin-bottom: 11vh;
& img {
    margin-top: 0.7rem;
    height: 7vw;
    width: 7vw;
    border-radius: 50px;
    margin-left: 2%;
    animation: ${spinRight} 3s linear infinite alternate;
    &: hover {
        animation: ${spinLeft} 3s linear infinite alternate;

        @media (max-width: 600px) {
            height: 13vw;
            width: 13vw;
        }
    }
}

`;

const Header = () => {
  return (
    <HeaderContainer>

      <Link to="/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FqXpI351PoVY6PbA_fSTHqxwfxGRFkiGdA&usqp=CAU" alt="logo" />
    </Link>
    </HeaderContainer>
  )
}

export default Header;
