import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

function AddTask() {
  const userId = sessionStorage.getItem("userId");
  const [Users, setUsers] = useState([]);
  const [Task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  });
  const handleInput = (e) => {
    setTask({ ...Task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/task/add", {
        ...Task,
        assignedBy: userId,
      })
      .then((val) => {
        console.log(val);
        alert("Task Created successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("server error");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/show")
      .then((val) => {
        // console.log(val);
        setUsers(val.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("server error");
      });
  }, []);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={6}>
            <div className="my-4">
              <h2>Add Task</h2>
            </div>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={Task.title}
                    onChange={handleInput}
                    placeholder="Enter Task Title"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 mt-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={Task.description}
                    onChange={handleInput}
                    rows={3}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                  <Form.Label>Task Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    // value={Task.dueDate}
                    onChange={handleInput}
                    placeholder="Enter Task Due Date"
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                  <Form.Label>Select Assigned User</Form.Label>
                  <Form.Select
                    aria-label="Select User"
                    name="assignedTo"
                    onChange={handleInput}
                  >
                    <option>Select User</option>
                    {Users.map((val, index) => {
                      return (
                        <option key={index} value={val?._id}>
                          {val?.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  size="large"
                  className="w-100 my-3"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddTask;
