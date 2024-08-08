'use client';

import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '../profile/atoms/Button';
// import Icon from '@/assets/studydate_logo.png';
// TODO: login시 profilecard- login 안했을 시 home

const Header = () => {

    
    return (
        <HeaderContainer>
            <Logo onClick={()=>window.location.reload()}>
                {/* <StyledIcon /> */}
                StudyDate
            </Logo>
            <Nav>
                <NavItem href="/">Home</NavItem>  
                <NavItem href="/login">Login</NavItem>
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

export default Header;