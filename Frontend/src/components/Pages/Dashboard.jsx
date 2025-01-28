import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [people, setPeople] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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
        if (res.message === "Unauthorized request") navigate("/unauth-req");
        // if (res.status !== "failed") setUser(res.data);
        // else setUser("");
        // console.log(res);
        setIsLoggedIn(res.status !== "failed");
        // }
      })
      .catch((err) => console.log(err));
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    fetch(
      `https://social-media-handler-two.vercel.app/api/v1/users/show-users`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.status !== "failed") setPeople(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // user.map(item => console.log(item.images))
        // console.log(user);
      });
  }, [navigate]);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li key={person._id} className="flex justify-between gap-x-6 py-5">
          <Link to={person.social_profile}>
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={person.images[0]}
                className="size-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  Total images {person.images.length}
                </p>
              </div>
            </div>
          </Link>
          {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs/5 text-gray-500">
                Last seen{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs/5 text-gray-500">Online</p>
              </div>
            )}
          </div> */}
        </li>
      ))}
    </ul>
  );
}
