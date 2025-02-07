import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../utilities/validations";
import { Link } from "react-router-dom";
import { loginApi, registerApi } from "../apis/authentication";
import { useCookies } from "react-cookie";
import Footer from "../comonents/Footer";
import Button from "../elements/Button";

const initialErrorsState = {
  email: "",
  password: "",
  api: "",
};
const Authentication = ({ pageType }) => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  //Handle previously logged in users
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorsState);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors = {
        ...newErrors,
        email: "Invalid email",
      };
    }
    if (!validatePassword(password)) {
      newErrors = {
        ...newErrors,
        password: "Password must be atleast 6 characters",
      };
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    //Make API call
    if (pageType === PageType.LOGIN) {
      //login api call
      const [response, error] = await loginApi({
        user: {
          email: email,
          password: password,
        },
      });
      handleResponse([response, error]);
    } else {
      //register api call
      const [response, error] = await registerApi({
        user: {
          email: email,
          password: password,
        },
      });
      handleResponse([response, error]);
    }
  };

  const handleResponse = async ([response, error]) => {
    if (error) {
      let result;
      if (error.message) {
        result = await error.message; //to handle for sign in separately
      } else {
        result = await error.text();
      }
      setErrors({
        ...errors,
        api: result,
      });
    } else {
      //const result = await response.json();
      const result = await response;
      const jwt = response.headers.get("authorization");
      setCookie("jwt", jwt);

      const message = result.message;
      navigate("/");
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold">
            {pageType === PageType.LOGIN ? "SIGN IN" : "SIGN UP"}
          </h3>
          {pageType === PageType.LOGIN ? (
            <p className="mt-2">
              Dont have account?
              <Link to="/register" className=" ms-1 underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="mt-2">
              Have an account already?
              <Link to="/login" className=" ms-1 underline">
                Sign in
              </Link>
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-8 max-w-96"
          >
            <div className="">
              <label className="text-lg">
                Email
                <input type="text" name="email" />
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                className="py-2 w-full border border-gray-600 rounded px-3"
                value={email}
                onChange={handleEmailChange}
              ></input>

              {errors.email && (
                <p className="text-sm text-medium text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-lg">
                Password
                <input type="text" name="password" />
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                className="py-2 w-full border border-gray-600 rounded px-3 "
                value={password}
                onChange={handlePasswordChange}
              ></input>
              {errors.password && (
                <p className="text-sm text-medium text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <Button>
              {pageType === PageType.LOGIN ? "SIGN IN" : "SIGN UP"}
            </Button>

            {errors.api && (
              <p className="text-sm text-medium text-red-600">{errors.api}</p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired,
};

export default Authentication;
