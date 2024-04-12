import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { InitialStateContext } from "../reducers/questionReducer";

export default function Navbar() {
  const location = useLocation();
  const { state, dispatch } = useContext(InitialStateContext);
  const navstyle = {
    active: "active text-decoration-none",
    inActive: "text-decoration-none inactive",
  };
  return (
    <div
      className="navbgcolor d-flex row p-2 m-0"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <div className="col">
        <h1 className="main-text-h1">Quizz App</h1>
      </div>
      <div className="col row pt-2 text-uppercase">
        <div className=" col">
          <Link
            to="/"
            className={
              location.pathname === "/" ? navstyle.active : navstyle.inActive
            }
          >
            Home
          </Link>
        </div>
        {state.login.teacherLogin ? (
          <div className=" col">
            <Link
              to="/teacherdashboard"
              className={
                location.pathname === "/teacherdashboard" ||
                location.pathname === "/teacherdashboard/creattest"
                  ? navstyle.active
                  : navstyle.inActive
              }
            >
              Teachers Dashboard
            </Link>
          </div>
        ) : (
          !state.login.studentLogin && (
            <div className=" col">
              <Link
                to="/teacherlogin"
                className={
                  location.pathname === "/teacherlogin"
                    ? navstyle.active
                    : navstyle.inActive
                }
              >
                Teachers Login
              </Link>
            </div>
          )
        )}
        {state.login.studentLogin ? (
          <div className=" col">
            <Link
              to="/studentdashboard"
              className={
                location.pathname === "/studentdashboard" ||
                location.pathname === "/studentdashboard/starttest"
                  ? navstyle.active
                  : navstyle.inActive
              }
            >
              Student Dashboard
            </Link>
          </div>
        ) : (
          !state.login.teacherLogin && (
            <div className=" col">
              <Link
                to="/studentlogin"
                className={
                  location.pathname === "/studentlogin"
                    ? navstyle.active
                    : navstyle.inActive
                }
              >
                student Login
              </Link>
            </div>
          )
        )}
        {(state.login.studentLogin || state.login.teacherLogin) && (
          <div className=" col">
            <Link
              to="/"
              className="logout text-decoration-none"
              onClick={() =>
                dispatch({
                  type: "logout",
                })
              }
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
