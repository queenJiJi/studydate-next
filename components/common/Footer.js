'use client';

import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <span>&copy; 2024 MyApp. All rights reserved.</span>
                <FooterNav>
                    <FooterNavItem>Privacy Policy</FooterNavItem>
                    <FooterNavItem>Terms of Service</FooterNavItem>
                </FooterNav>
            </FooterContent>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
`;

const FooterContent = styled.div`
    text-align: center;
`;

const FooterNav = styled.div`
    margin-top: 10px;
`;

const FooterNavItem = styled.a`
    margin-left: 10px;
    color: #fff;
    text-decoration: none;
    font-size: 13px;

    &:hover {
        text-decoration: underline;
    }
`;

export default Footer;