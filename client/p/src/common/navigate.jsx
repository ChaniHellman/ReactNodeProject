import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsername } from '../redux/userSlice';  
import '../css.css';

const Navig = () => {
    const location = useLocation();
    const globalUsername = useSelector(state => state.user.name);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        localStorage.clear();
        dispatch(setUsername('Guest'));  
        navigate('/'); 
    };

    const authenticatedItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/store'),
            className: location.pathname === '/store' ? 'active-item' : ''
        },
        {
            label: 'Manage',
            icon: 'pi pi-cog',
            command: () => navigate('/products'),
            className: location.pathname === '/products' ? 'active-item' : ''
        },
        {
            label: `Welcome, ${globalUsername || 'Guest'}`,
            icon: 'pi pi-user',
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: handleLogout
        }
    ];

    const unauthenticatedItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/store'),
            className: location.pathname === '/store' ? 'active-item' : ''
        },
        {
            label: 'Enter',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-sign-in',
                    command: () => navigate('/login')
                },
                {
                    label: 'Register',
                    icon: 'pi pi-user-plus',
                    command: () => navigate('/register')
                }
            ],
            className: location.pathname === '/login' || location.pathname === '/register' ? 'active-item' : ''
        },
        {
            label: `Welcome, ${globalUsername || 'Guest'}`,
            icon: 'pi pi-user',
        }
    ];

    return (
        <div className="navig-menu">
            <Menubar model={!localStorage.getItem('token') ? unauthenticatedItems : authenticatedItems} className="navig-menubar" />
        </div>
    );
}

export default Navig;