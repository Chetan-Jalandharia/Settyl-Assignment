import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateModal({ show, data, setShow, setUpdate }) {
  const [Task, setTask] = useState({
    id: data?._id,
    title: data?.title,
    description: data?.description,
    dueDate: data?.dueDate,
    currentStatus: data?.currentStatus,
  });

  const handleInput = (e) => {
    setTask({ ...Task, [e.target.name]: e.target.value });
  };
  const handleClose = () => setShow(false);
  const handleSubmit = (Task) => {
    setShow(false);
    // console.log(Task);

    axios
      .post("http://localhost:5001/api/task/update", Task)
      .then((val) => {
        console.log(val);
        alert("Task Updated successfully");
        setUpdate((pre) => pre + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("server error");
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={Task?.title}
                onChange={handleInput}
                placeholder="Enter Task Title"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={Task?.description}
                onChange={handleInput}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Select Current Status</Form.Label>
              <Form.Select
                aria-label="Select User"
                name="currentStatus"
                onChange={handleInput}
              >
                <option value={"Assigned"}>Assigned</option>
                <option value={"In-Progress"}>In-Progress</option>
                <option value={"Completed"}>Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Task Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                defaultValue={data?.dueDate.slice(0, 10)}
                onChange={handleInput}
                placeholder="Enter Task Due Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(Task)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
