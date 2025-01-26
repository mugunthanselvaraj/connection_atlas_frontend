import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { logOutApi } from "../apis/authentication";
import { useState } from "react";
import Button from "../elements/Button";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [jwt, setJwt] = useState(cookies.jwt);
  const handleLogout = async (e) => {
    const [response, error] = await logOutApi(cookies.jwt);
    handleResponse([response, error]);
  };

  const handleResponse = async ([response, error]) => {
    if (error) {
      removeCookie("jwt");
    } else {
      removeCookie("jwt");
    }
    setJwt(null);
  };

  return (
    <div className="bg-white h-16 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-600  ">Logo</div>
          <div className="font-bold text-2xl">Connection Atlas</div>
          <div className="flex">
            {jwt ? (
              <Button onClick={handleLogout}>Sign Out</Button>
            ) : (
              <Link
                to="/login"
                className="bg-slate-50 hover:bg-slate-500 rounded px-2 py-1.5 my-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
