import React from 'react'
import {Link} from 'react-router-dom'

export const Header: React.FC = () => {
    return <nav className="green darken-2">
        <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Weather</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    </nav>
};