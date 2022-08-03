import { Link } from "react-router-dom";

export default function Header({ handleRefreshApp }) {
  let isAuth = localStorage.getItem("userTest");
  let handleLogOut = () => {
    localStorage.removeItem("userTest");
    handleRefreshApp();
  };
  let userInfor = (JSON.parse(isAuth))?.userName;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto ">
            <Link to={"/"}>
              <li className="nav-item cursor-pointer mx-4">Home</li>
            </Link>
            <Link to={"/list-product"}>
              <li className="nav-item cursor-pointer mx-4">Product List</li>
            </Link>
          </ul>
          {!isAuth ? (
            <>
              <Link to={"/login"}>
              <span className="nav-item cursor-pointer mx-4">Login</span>
              </Link>
              <Link to={"/sign-up"}>
              <span className="nav-item cursor-pointer mx-4">Sign up</span>
              </Link>
            </>
          ) : (
            <>
              <span className="nav-item cursor-pointer mx-4 text-primary">{userInfor}</span>
              <Link to={"/login"} onClick={handleLogOut}>
              <span className="nav-item cursor-pointer mx-4">Logout</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
