import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import ConfirmationModal from './ConfirmationModal';
import { sidebarLinks } from '../../../assets/data/dashboard-links';
import { setToken, setUser } from '../../../slices/userSlice';
import toast from 'react-hot-toast';

export default function DashSidebar() {
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null)
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    //To Check what tab has to be rendered
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate('/')
  };
  return (
    <>
    <div className="flex md:h-[calc(100vh-3.5rem)] sm:h-fit min-w-[220px]  flex-col border-r-[1px] border-r-blue-100 bg-gradient-to-tr from-blue-300/50 via-white to-green-300/35 py-10">
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SidebarLink key={link.id} link={link} iconName={link.icon} tab={tab}/>
          )
        })}
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-cyan-700" />
      <div className="flex flex-col">
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => handleSignout(),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className="flex items-center gap-x-2">
            <HiArrowSmRight className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </>
  );
}
