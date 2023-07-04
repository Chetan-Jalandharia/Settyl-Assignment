import axios from "axios";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import UpdateModal from "./UpdateModal";
import { useState } from "react";

function Cards({ data,  setUpdate }) {
  const [show, setShow] = useState(false);
 
  const delNotes = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:5001/api/task/remove/${id}`)
      .then((val) => {
        console.log(val);
        // setTasks(val.data.data);
        setUpdate((pre) => pre + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("server error");
      });
  };
  const handleShow = (data) => {
    setShow(true);
  };

  return (
    <>
     <UpdateModal show={show} data={data} setShow={setShow} setUpdate={setUpdate} />
      <Card
        style={{
          width: "95%",
          minHeight: "350px",
          maxHeight: "fit-content",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        <Card.Body>
          <Card.Title className="fw-bold">{data.title}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Card.Text>Due Date : {data?.dueDate.slice(0, 10)}</Card.Text>
          <Card.Text>Assigned By : {data?.assignedBy?.name}</Card.Text>
          <div className="position-absolute bottom-0 my-3 ">
            <Button onClick={() => handleShow(data)}>Update</Button>
            <Button
              variant="danger"
              className="ms-2 "
              onClick={() => delNotes(data?._id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;
