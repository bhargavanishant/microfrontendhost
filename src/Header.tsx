import React from 'react'
import './index.css'

import Hamburger from './Hamburger';

export default function Header() {
    return (<header className="header">
        <Hamburger></Hamburger>
        {/* <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav> */}
    </header>);
}
