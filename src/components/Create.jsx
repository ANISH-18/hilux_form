import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Create.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Create() {
  let { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    form: "",
  });

  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const handelSubmit = () => {
    // alert("Function Working");
    // validation code
    if (!data.name) {
      alert("Task is required");
      return;
    }
    if (!data.description) {
      alert("Description is required");
      return;
    }
    if (!data.form) {
      alert("Priority is required");
      return;
    }
    // validation complete
    if (id === undefined) {
      axios.post("http://localhost:8081/category_one/", data).then((res) => {
        console.log(res.data);
        alert("Data Submitted");
        // submitNotify();
        navigate("/");
      });
    } else {
      axios
        .put(`http://localhost:8081/category_one/${id}`, data)
        .then((res) => {
          console.log(res.data);
          alert("Data Updated Successfully");
          navigate("/");
        });
    }
  };

  const getData = (id) => {
    axios.get(`http://localhost:8081/category_one/${id}`).then((res) => {
      setData({
        name: res.data.name,
        description: res.data.description,
        form: res.data.form,
      });
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    // if (id) {
    getData(id);
    // }
  }, [id]);

  return (
    <div>
      <div className="container ">
        <h1>Create a TODO</h1>
        <div className="col-lg-6">
          <Form>
            <h3>Name</h3>

            <input
              type="name"
              name="name"
              value={data.name}
              class="form-control"
              id="name"
              placeholder="name"
              onChange={(e) => {
                handelChange(e);
              }}
            />

            <h3>Description</h3>

            <input
              type="descritpion"
              class="form-control"
              id="description"
              placeholder="Enter Description"
              name="description"
              value={data.description}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            <h3>Form</h3>
            <input
              type="form"
              class="form-control"
              id="form"
              placeholder="Enter Description"
              name="form"
              value={data.form}
              onChange={(e) => {
                handelChange(e);
              }}
            />

            <Button
              variant="success"
              className="mt-3"
              onClick={() => {
                handelSubmit();
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-lg-6"></div>
      </div>
    </div>
  );
}

export default Create;
