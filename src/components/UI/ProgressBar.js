import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routes = {
    '/': 'Home',
    '/forum': 'Forums',
    // ... add other routes and their display names
};

function ProgressBar() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    console.log(location)
    return (
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <span key={name}>
                        {' > '}
                        <Link to={routeTo}>{routes[routeTo] || name}</Link>
                    </span>
                );
            })}
        </div>
    );
}

export default ProgressBar;
