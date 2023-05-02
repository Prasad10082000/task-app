import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Testapk.css";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 350,
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function Testapk() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, Setinput] = useState({
    title: "",
    status: "",
  });
  const [Data, Setdata] = useState([]);
  const [Edit, Editclick] = useState(false);
  const [Index, Editindex] = useState("");

  const state = {
    date: new Date().toLocaleString(),
  };
  const handleChange = (e) => {
    Setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Edit) {
      Object.assign(Data[Index], input);
      Setdata([...Data]);
      Editclick(false);
      Setinput({
        title: "",
        status: "",
      });
    } else {
      Setdata([...Data, input]);
      Setinput({
        title: "",
        status: "",
      });
    }
  };

  const handleDelete = (index) => {
    const FilterData = Data.filter((item, i) => i !== index);
    Setdata(FilterData);
  };

  const HandleEdit = (index) => {
    const tempdata = Data[index];
    Setinput({ title: tempdata.title, status: tempdata.status });
    Editclick(true);
    Editindex(index);
  };

  const [filter, setFilter] = useState("All");

  const filteredData = Data.filter((item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Complete") {
      return item.status === "Complete";
    } else if (filter === "Incomplete") {
      return item.status === "Incomplete";
    }
  });

  return (
    <div className="maindiv">
      <h1 className="h11">TEST APPLICATION</h1>
      <div className="maindivb">
        <div className="subdiv">
          <div>
            <button onClick={handleOpen} className="btn3">
              Add Task
            </button>
          </div>
          <div>
            <select
              name=""
              id="select1"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
        {filteredData.map((item, i) => (
          <div className="subdivb">
            <div className="content">
              <div>
                <input
                  type="checkbox"
                  name=""
                  id="c1"
                  checked={item.status === "Complete"}
                  onChange={handleChange}
                />
                {item.title}
                <p>{state.date}</p>
              </div>
              <div>
                <button
                  className="deletebtn"
                  onClick={() => {
                    handleDelete(i);
                  }}
                >
                  <DeleteIcon />
                </button>
                <button
                  className="editbtn"
                  onClick={() => {
                    HandleEdit(i);
                  }}
                >
                  <EditIcon onClick={handleOpen} />
                </button>
              </div>
            </div>
          </div>
        ))}{" "}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="box1">
            <Typography id="transition-modal-title" variant="h4" component="h2">
              ADD TODO
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <div className="formdiv1">
                  <label className="f1l">Title</label>
                  <input
                    className="inp1"
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="formdiv1">
                  <label htmlFor="" className="f1l">
                    Status
                  </label>
                  <select
                    name="status"
                    className="inp2"
                    onChange={handleChange}
                    value={input.status}
                  >
                    <option value={null}>Select your task Status</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                  </select>
                </div>
                <button className="btn3" type="submit" onClick={handleClose}>
                  {Edit ? "Update Task" : "Add Task"}
                </button>
              </form>
              <div className="addc">
                <button className="btn2" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
