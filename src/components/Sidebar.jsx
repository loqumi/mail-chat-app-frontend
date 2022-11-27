import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMailOpenSharp, IoMail, IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <div>
          <ul className="menu-list">
            <li>
              <NavLink to={"/mails"}>
                <IoMailOpenSharp /> My mail
              </NavLink>
              <NavLink to={"/send"}>
                <IoMail /> Send message
              </NavLink>
            </li>
          </ul>
        </div>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
