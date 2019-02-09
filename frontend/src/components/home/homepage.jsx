import React from 'react';

export const HomePageComponent = () => {
    const loggedIn = localStorage.getItem('auth_token')
    const fakeLogout = () => localStorage.removeItem('auth_token')
    return (<div>
        <h1>Welcome to StoreXChange</h1>
        {loggedIn && <button onClick={() => fakeLogout()}>LogOut</button>}
    </div>);
}