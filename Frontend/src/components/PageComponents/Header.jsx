import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/Context.jsx";
import { useNavigate,Link } from "react-router-dom";

// const loginText = 



export default function Header() {
  const [user, setUser] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const loggingOut = () => {
    // console.log("pressed");
    fetch(`https://social-media-handler-two.vercel.app/api/v1/admin/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        (res);
        if (res.status !== "failed") setIsLoggedIn(false);
      })
      .catch((err) => console.log(err));
  };


  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Dashboard", href: "/dashboard", current: false },
  ];


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `https://social-media-handler-two.vercel.app/api/v1/admin/my-profile`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // if (res?.status !== "failed") {
        // Set the user data if the profile fetch is successful
        //  setUser(res);
        // if (res.status) console.log(res);
        // console.log(res);
        if (res.status !== "failed") setUser(res.data);
        else setUser("");
        // console.log(res);
        setIsLoggedIn(res.status !== "failed");
        // }
      })
      .catch((err) => console.log(err));
  }, [navigate,isLoggedIn]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/*  */}
                <Link
                  to="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>

                {/* Dashboard Link */}
                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                ) : (
                  ""
                )}

                {/* Login/Logout Button */}
                {isLoggedIn ? (
                  <button
                    // Write your logout logic here
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    onClick={loggingOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                )}

                {/*  */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            

            {/* Profile dropdown */}
            <p className="text-blue-600">{user.email}</p>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* Home Link */}
          <Link
            to="/"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Home
          </Link>

          {/* Dashboard Link */}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Dashboard
            </Link>
          )}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <Link
              to="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              onClick={loggingOut} // Your logout logic here
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
