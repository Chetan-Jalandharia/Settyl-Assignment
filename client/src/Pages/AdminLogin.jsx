import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const Navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(User);
    axios
      .post("http://localhost:5001/api/user/adminlogin", User)
      .then((val) => {
        if (val.data.token) {
          sessionStorage.setItem("auth", val.data.token);
          sessionStorage.setItem("adminAuth", true);
          sessionStorage.setItem("userId", val.data.data._id);
        }
        alert("Login Success");
        Navigate("/admin");
        // console.log(val);
      })
      .catch((err) => {
        console.log(err);
        alert("server error");
      });
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5} className="p-1">
            <h2 className="my-4 mx-2">Login</h2>
            <Form className="my-5 px-2" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={User.email}
                  onChange={handleInput}
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={User.password}
                  onChange={handleInput}
                  name="password"
                />
              </Form.Group>
              <Button
                variant="primary"
                size="large"
                className="w-100 mt-3"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminLogin;
