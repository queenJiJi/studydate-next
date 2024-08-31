'use client';

import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '../profile/atoms/Button';
import { clearAuthToken, getAuthToken } from '@/lib/utils/user';
import { useAuth } from '@/store/authStore';
import { useRouter } from 'next/navigation';  
import Swal from 'sweetalert2';

// import Icon from '@/assets/studydate_logo.png';
// TODO: login시 profilecard- login 안했을 시 home

const Header = () => {
    // const [isLogged, setIsLogged] = useState(false);
    // useEffect(()=>{
    //     if(getAuthToken()) {
    //         console.log(isLogged);
    //         setIsLogged(true);
    //     }
    // },[]);
    const isLogged = useAuth((state)=> state.isLogin);
    const isLogout = useAuth((state)=> state.updateToLogout);
    const router = useRouter();  // Initialize useRouter

    const logoutHandler= () =>{
        isLogout(); // 상태변화
        clearAuthToken(); // 로컬스토리지 비우기
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You are logged out!'
        });
        router.push('/login');
    }
    return (
        <HeaderContainer>
            <Logo onClick={()=>window.location.reload()}>
                {/* <StyledIcon /> */}
                StudyDate
            </Logo>
            <Nav>
                <NavItem href="/">Home</NavItem>  
                {!isLogged ? <NavItem href="/login">Login</NavItem>:<StyledButton onClick={logoutHandler}>Logout</StyledButton> }
                {/* <NavItem href="/login">Login</NavItem>  */}
                {/* <NavItem href="/signup">Sign Up</NavItem> */}
                <NavItem href="/mainprofile">Profile</NavItem>
                <NavItem href="/registerprofile">MyProfile</NavItem>
                <NavItem href='matching'>Matching</NavItem>
            </Nav>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: black;
    color: black;
`;

const Logo = styled(Button)`
    font-size: 24px;
    font-weight: 800;
    font-style: italic;
    width: 15%;
    background-color: black;

    &: hover {
        background-color: black;
    }
`;

// const StyledIcon = styled(Icon)``;

const Nav = styled.nav`
    display: flex;
`;

const NavItem = styled(Link)`
    margin-left: 20px;
    color: #fff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledButton = styled.div`
    color: white;
    background-color: black;
    padding: 0px;
    margin-left: 20px;
    border: none;
    width: 100%;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        text-decoration: underline;
    }
    
`;

export default Header;