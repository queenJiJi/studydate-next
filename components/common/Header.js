'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '../profile/atoms/Button';

const Header = () => {
    return (
        <HeaderContainer>
            <Logo onClick={()=>window.location.reload()}>StudyDate</Logo>
            <Nav>
                <NavItem href="/">Home</NavItem>
                <NavItem href="/login">Login</NavItem>
                <NavItem href="/signup">Sign Up</NavItem>
                <NavItem href="/mainprofile">Profile</NavItem>
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