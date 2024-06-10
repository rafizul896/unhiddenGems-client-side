import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#2557a7] text-base" : "text-base"}>Home</NavLink>
        <NavLink to="/allJobs" className={({ isActive }) => isActive ? "text-[#2557a7] text-base" : "text-base"}>Community</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "text-[#2557a7] text-base" : "text-base"}>Blogs</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "text-[#2557a7] text-base" : "text-base"}>About Us</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "text-[#2557a7] text-base" : "text-base"}>Contact Us</NavLink>
    </>
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div className='navbar px-0'>
            <div className='flex-1'>
                <div className="dropdow">
                    <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                        {
                            open ? <IoClose /> : <FiMenu />
                        }
                    </div>
                    <ul className={`${open ? 'block' : 'hidden'} absolute menu menu-md dropdown-content mt-3 z-[5] p-2 shadow bg-base-300 rounded-box w-[200px] flex gap-3 py-5  text-center items-center justify-center`}>
                        {links}
                    </ul>
                </div>
                <div className='flex gap-2 lg:gap-0 items-center'>
                    <img className='w-auto h-7' src='' alt='' />
                    <Link to="/" className='font-semibold md:font-bold text-2xl md:text-4xl '>Tourist Guide</Link>
                </div>
            </div>
            <div className='flex-none flex items-center gap-1 md:gap-0'>
                <ul className='menu menu-horizontal items-center px-2'>
                    <div className="flex gap-5">
                        <div className="hidden lg:flex gap-5">
                            {links}
                        </div>
                        {
                            !user && (
                                <Link to='/login'>Login</Link>
                            )
                        }
                        {
                            !user && (
                                <Link to='/register'>Register</Link>
                            )
                        }
                    </div>
                </ul>
                {
                    user &&

                    <div className='dropdown dropdown-end z-50 ml-2'>
                        <div
                            data-tip={`${user.displayName}`}
                            tabIndex={0}
                            role='button'
                            className='avatar tooltip hover:tooltip-open tooltip-left'
                        >
                            <div className='w-10 rounded-full ' title=''>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <Link to='/dashboard' className='justify-between'>Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/offerAnnouncements'>Offer Announcements</Link>
                            </li>
                            <li className='mt-2'>
                                <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;