import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Signup() {
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(User);
    axios.post("http://localhost:5001/api/user/register",User)
    .then(val=>{
        alert("registration Success")
    }).catch(err=>{
        console.log(err);
        alert("server error")
    })
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5} className="p-1">
            <h2 className="my-4 mx-2">Signup</h2>
            <Form className="my-5 px-2" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={User.name}
                  onChange={handleInput}
                  name="name"
                  placeholder="Enter Your Name"
                />
              </Form.Group>
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
            <div className="text-center">
              <Link to={"/login"}>Already have account? Login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
