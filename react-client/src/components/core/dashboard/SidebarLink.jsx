import * as Icons from "react-icons/hi"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

export default function SidebarLink({ link, iconName ,tab }) {

  const Icon = Icons[iconName];
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return route === tab
  }

  return (
    <NavLink
      to={link.path}
      onClick={() =>{} }
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.tab)
          ? "bg-blue-800 text-white"
          : "bg-opacity-0 text-black"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-blue-500 ${
          matchRoute(link.tab) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        {/* <Icon className="text-lg" /> */}
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
