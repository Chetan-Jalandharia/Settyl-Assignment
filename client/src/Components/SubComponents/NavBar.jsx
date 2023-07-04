import { useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  let auth = sessionStorage.getItem("auth");

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"  "}
            <b>Note mi</b>
          </Navbar.Brand>
          <Nav className="ms-auto me-2">
            <NavLink
              to={"/"}
              className={"text-decoration-none text-light mx-2"}
            >
              Home
            </NavLink>
            <NavLink
              to={"/allTask"}
              className={"text-decoration-none text-light mx-2"}
            >
              Tasks
            </NavLink>
            {!!auth === true ? (
              <Button
                variant="outline-danger"
                size="sm"
                className={" mx-2 text-light fw-bold"}
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            ) : (
              <NavLink
                to={"/login"}
                className={"text-decoration-none text-light mx-2"}
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
