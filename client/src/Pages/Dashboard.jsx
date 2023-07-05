import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cards from "../Components/SubComponents/Card";

const Dashboard = () => {
  const Navigate = useNavigate();
  const svgRef = useRef();
  const [Update, setUpdate] = useState(0);
  const [data, setdata] = useState([]);
  const [ChartData, setChartData] = useState([]);

  useEffect(() => {
    let auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      Navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    let auth = sessionStorage.getItem("adminAuth");
    auth &&
      axios
        .get(`http://localhost:5001/api/task/showAll`)
        .then((val) => {
          setdata(val.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert("server error");
        });
  }, []);

  useEffect(() => {
    let Assigned = 0;
    let InProgress = 0;
    let Completed = 0;

    data?.forEach((val, index) => {
      //   console.log(val);
      if (val.currentStatus === "Completed") {
        Completed++;
      } else if (val.currentStatus === "In-Progress") {
        InProgress++;
      } else {
        Assigned++;
      }
    });

    setChartData([
      { property: "Assigned", value: Assigned },
      { property: "In-Progress", value: InProgress },
      { property: "Completed", value: Completed },
    ]);
    // console.log(ChartData);
  }, [data]);

  useEffect(() => {
    const w = 400;
    const h = 400;
    const radius = w / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .attr("viewBox", [-w / 2, -h / 2, w, h])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const formatedData = d3.pie().value((d) => d.value)(ChartData);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    svg
      .selectAll()
      .data(formatedData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.value))
      .style("opacity", 0.7);

    svg
      .selectAll()
      .data(formatedData)
      .join("text")
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")

          .text((d) => d.data.property)
          .call((text) =>
            text
              .filter((d) => d.endAngle - d.startAngle > 0.25)
              .append("tspan")
              .attr("x", 0)
              .attr("y", "0.7em")
              .attr("fill-opacity", 0.7)
              .text((d) => d.data.value.toLocaleString("en-US"))
          )
      );
  }, [ChartData]);

  const sortByIncDate = () => {
    let val = data.map((val, index) => {
      let date = new Date(val.dueDate);
      val.dueTime = d3.timeDay.count(Date.now(), date.getTime());
      return val;
    });

    val = val.sort((x, y) => {
      return d3.ascending(x.dueTime, y.dueTime);
    });
    setdata(val);
  };
  const sortByDecDate = () => {
    let val = data.map((val, index) => {
      let date = new Date(val.dueDate);
      val.dueTime = d3.timeDay.count(Date.now(), date.getTime());
      return val;
    });

    val = val.sort((x, y) => {
      return d3.descending(x.dueTime, y.dueTime);
    });
    setdata(val);
    // console.log(val);
  };

  return (
    <>
      <div className="text-center py-5">
        <svg ref={svgRef}></svg>
      </div>
      <hr />
      <Container fluid>
        <div className="d-flex justify-content-between mt-2 mb-4 mx-3">
          <h2 className="d-inline-block">All Tasks</h2>
          <div className="d-inline w-25">
            <Button onClick={sortByIncDate} className="m-1">
              Sort Min Due Date
            </Button>
            <Button onClick={sortByDecDate} className="m-1">
              Sort Max Due Date
            </Button>
            <InputGroup className="">
              <Form.Control
                placeholder="Search Task"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-primary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        <div>
          {
            <Row className="gx-0 ">
              {data?.map((val, key) => {
                console.log(val);
                return (
                  <Col lg={3} md={4} sm={6} xs={12} key={key}>
                    <Cards
                      className="mx-auto"
                      data={val}
                      setUpdate={setUpdate}
                    />
                  </Col>
                );
              })}
            </Row>
          }
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
