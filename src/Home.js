import React, { useEffect, useState } from "react";
import {
  Navbar,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addUser,
  deleteUser,
  loadUsers,
  loadSingleUser,
  updateUser,
} from "./redux/actions";

const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
};

const Home = () => {
  const [state, setState] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { users, msg, user } = useSelector((state) => state.data);
  console.log(msg);
  const { name, email, contact, address } = state;

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !address) {
      toast.error("Please fill all input fields");
    } else {
      if (!editMode) {
        dispatch(addUser(state));
        setState(initialState);
      } else {
        dispatch(updateUser(state, userId));
        setState(initialState);
        setEditMode(false);
        setUserId(null);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure .. you wanted to delete the user now")) {
      dispatch(deleteUser(id));
    }
  };

  const handleUpdate = (id) => {
    dispatch(loadSingleUser(id));
    setUserId(id);
    setEditMode(true);
  };

  return (
    <div>
      <Navbar
        bg="primary"
        variant="dark"
        className="justify-content-center mb-5"
      >
        <Navbar.Brand>Python Flask MongoDb Crud Redux Application</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type the Name"
                  name="name"
                  value={name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type the Name"
                  name="email"
                  value={email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type the Name"
                  name="contact"
                  value={contact || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type the Name"
                  name="address"
                  value={address || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button type="submit" variant="primary" size="lg">
                  {editMode ? "Update" : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {users &&
                users.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>{item.address}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            style={{ marginRight: "5px" }}
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Update
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
