import React, { useEffect, useState } from "react";
import { GetData, GetUers } from "../../api-Request/todo";
import AddComponent from "./add";

import "./add.css";

const Todo = () => {
  const [array, setArray] = useState([]);
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("all");

  const [modalToEdit, setModalToEdit] = useState({});
  const [titleEdit, setTitleEdit] = useState();
  const [editCompletedStatus, setEditCompletedStatus] = useState(false);

  //   get data for api calll
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const responseCategoryListData = await GetData();
    setArray(responseCategoryListData.data);
    const responseGetUersData = await GetUers();
    setUser(responseGetUersData);
  };
  // filter the data all and completed
  const filteredTasks =
    filter === "completed" ? array.filter((task) => task.completed) : array;

  // select the task is complted or not function
  const check = (id) => {
    const select = array.filter((x) => x.id === id)[0];
    if (!select.completed) {
      const modData = array?.map((x) => ({
        ...x,
        completed: x?.id == select?.id ? true : x?.completed,
      }));

      setArray(modData);
    } else {
      const modData = array?.map((x) => ({
        ...x,
        completed: x?.id == select?.id ? false : x?.completed,
      }));

      setArray(modData);
    }
  };

  // onchange for Edit filed

  const onChangeTitleEdit = (event) => {
    setTitleEdit(event.target.value);
  };

  // delete functionality

  const remove = (id) => {
    const deleted = array.filter((x) => x.id !== id);
    setArray(deleted);
  };

  //   Edit functionality
  const onCklickUpdate = () => {
    setTitleEdit("");
    const select = array.filter((x) => x.id === modalToEdit.id)[0];
    const modData = array?.map((x) => ({
      ...x,
      title: x?.id == select?.id ? titleEdit : x?.title,
      completed: x?.id == select?.id ? editCompletedStatus : x?.completed,
    }));

    setArray(modData);

    setModalToEdit({ title: "" });
    alert("update sucess");
  };
  return (
    <div>
      <div className="Todo-apllication">
        <h1>Todo Application</h1>
        <div className="margin:10px">
          <div className="filter-buttons">
            {/* <button onClick={() => setFilter('all')}>All Tasks</button> */}
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => setFilter("all")}
            >
              All Tasks
            </button>
            <button
              type="button"
              class="btn btn-success"
              onClick={() => setFilter("completed")}
            >
              Compled Tasks
            </button>

            <AddComponent array={array} setArray={setArray} />
          </div>
        </div>
      </div>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              {/* <th scope="col">UserId</th> */}
              <th scope="col">Title</th>
              <th scope="col " className="text-end" >Actions</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                {/* <td>{x.userId}</td> */}
                <td>{x.title}</td>
                <td>
                  {
                    <input
                      type="checkbox"
                      checked={x.completed ? true : false} // Ternary operator for conditional rendering
                      onChange={() => check(x.id)}
                    />
                  }

                  <span
                    className={`fw-semibold px-2 ${
                      x.completed ? "text-success" : " text-danger"
                    }`}
                  >
                    {x.completed ? "completed" : "not completed"}
                  </span>
                  
                </td>
                <td>
                  <div className="d-flex">
                    <button
                      type="button"
                      class="btn "
                      onClick={() => setModalToEdit(x)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn" onClick={() => remove(x.id)}>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {/* <!-- Button trigger modal --> */}

      {/* <!--Edit pouop Modal  --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog text-capitalize ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Edit Task
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="d-flex flex-column">
                <label htmlFor="">Task name:</label>
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  className="w-100 mb-3 p-1"
                  onChange={(e) => onChangeTitleEdit(e)}
                  defaultValue={modalToEdit.title}
                />

                <select
                  className="p-1"
                  name=""
                  id=""
                  onChange={(e) => setEditCompletedStatus(e.target.value)}
                >
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </select>
                <p>
                  Cureent Status :
                  <span
                    className={`fw-semibold px-2 text-capitalize ${
                      modalToEdit.completed ? "text-success" : " text-danger"
                    }`}
                  >
                    {modalToEdit.completed ? "completed" : "not completed"}
                  </span>
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onCklickUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
    </div>
  );
};

export default Todo;
