import React, { useState, useEffect } from "react";
// import { GetData } from "../../api-Request/todo";

const AddComponent = (props) => {
  const { array, setArray } = props;
  const [name, setName] = useState("");
  const [close,setClose]=useState(false)

  const onChangeName = (event) => {
    setName(event.target.value);
  };
// submit data
  const submitData = () => {
    if (name.length === 0) {
      alert("Please Enter the Name");
    }
    if (name.length < 4) {
      alert("Task Name Contain Minimum 4 Leters");
    }
else{
    const newData = {
      // user id add defalt one 
      userId: 1,
      id: array.length + 1,
      title: name,
      // task status also add defalt flase
      completed: false,
    };
    setArray((prevArray) => [...prevArray, newData]);
    alert('success')
    setName("");
  };
  }
  return (
    <div className="">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Tasks
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Taks
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <div className="d-flex ">
                  <input
                    type="text"
                    placeholder="Enter Task Name"
                    className="w-100"
                    onChange={onChangeName}
                    value={name}
                  />
                </div>
              </div>
              {/* ... */}
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
                onClick={submitData}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
