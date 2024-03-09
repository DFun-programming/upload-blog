import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Header = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=>state.user);
  
  return (
    <Navbar className='border-b-2 px-3 bg-gradient-to-br from-blue-300/30 via-white to-green-300/30' >
        <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Dot</span>
            Blog
        </Link>
       
        <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10  ' color='gray' pill onClick={()=>navigate('/search')}>
            <FiSearch></FiSearch>
        </Button>
      
       {
        currentUser?(<Dropdown arrowIcon={false}
        inline
        label={<Avatar alt='user' img={currentUser.image} rounded></Avatar>}
        >
        <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
        </Dropdown.Header>
        <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        </Dropdown>):
        ( <Link to={'/signin'}>
            <Button outline gradientDuoTone={'greenToBlue'} >
                Sign in
            </Button>
        </Link>)
       }
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to={'/'}>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link to={'/about'}>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/search'} as={'div'}>
                <Link to={'/search'} >Blogs</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header