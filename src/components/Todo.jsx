import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Create.css";
import { LinkContainer } from "react-router-bootstrap";

function Todo() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("http://localhost:8081/category_one/").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  };

  function handelDelete(id) {
    axios.delete(`http://localhost:8081/category_one/${id}`).then((res) => {
      alert("Delete Succussfully");
      getData();
    });
    // alert(id);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <h1>TODO LIST</h1>
        <table class="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachData, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th>{eachData.name}</th>
                  <th>{eachData.description}</th>
                  <th>{eachData.form}</th>
                  <th>
                    <div className="action">
                      <LinkContainer to={"/create/" + eachData.id}>
                        <Button variant="success">Update</Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        onClick={(e) => {
                          handelDelete(eachData.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
