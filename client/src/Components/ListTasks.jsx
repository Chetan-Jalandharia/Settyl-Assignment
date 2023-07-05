import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "./SubComponents/Card";

import { useState } from "react";
import axios from "axios";
const ListTasks = () => {

  const [Tasks, setTasks] = useState([]);
  const [Update, setUpdate] = useState(0);
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    const userId = sessionStorage.getItem("userId");
    // console.log(auth,userId);
    auth &&
      axios
        .get(`http://localhost:5001/api/task/showAssigned/${userId}`)
        .then((val) => {
          // console.log(val);
          setTasks(val.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert("server error");
        });
  }, [Update]);
  return (
    <div>
      <Row className="gx-0 ">
        {Tasks?.map((val, key) => {
          return (
            <Col lg={3} md={4} sm={6} xs={12} key={key} >
              <Card
              className="mx-auto"
                data={val}
              
                setUpdate={setUpdate}
              />
        
            </Col>
          );
        })}
      </Row>
     
    </div>
  );
};

export default ListTasks;
