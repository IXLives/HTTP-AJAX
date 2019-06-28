import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      email: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  editFriend = (e) => {
    const { name, age, email } = this.state;
    const updated = { name, age, email };
    const id = e.target.name
    e.preventDefault();

    axios.put(`http://localhost:5000/friends/${id}`, updated)
      .then((response) => {
        this.props.updateFriends(response.data)
        this.setState({
          name: "",
          age: 0,
          email: ""
        })
      })
  }

  deleteItem = e => {
    e.preventDefault();
    const id = e.target.name;

    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(response => {
        console.log(response.data);
        this.props.updateFriends(response.data);
        this.setState({
          name: "",
          age: 0,
          email: ""
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  addAFriend = e => {
    const { name, age, email } = this.state;
    const newFriend = { name, age, email };
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", newFriend)
      .then(response => {
        this.props.updateFriends(response.data);
        this.setState({
          name: "",
          age: 0,
          email: ""
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  render() {
    return (
      // Friend page wrapper
      <div className="friendPage">
        {/* Friend list */}
        <div className="friendList">
          <h1>Your Friends</h1>
          <div className="friendCards">
            {this.props.friends.map(friend => {
              return (
                <Card>
                  <CardBody>
                    <CardTitle>{friend.name}</CardTitle>
                    <CardText>{friend.age}</CardText>
                    <CardText>{friend.email}</CardText>
                    <Button name={friend.id} onClick={this.deleteItem}>
                      x
                    </Button>
                    <Button name = {friend.id} onClick = {this.editFriend}>✏</Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
        {/* New friend form */}
        <div className="friendForms">
          <div className="addAFriend">
            <Form onSubmit={this.addAFriend}>
              <h1>Add a friend!</h1>
              <FormGroup>
                <Label for="NameInput">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your friend's name!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="AgeInput">Age</Label>
                <Input
                  type="text"
                  id="age"
                  placeholder="Enter your friend's age!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="EmailInput">Email</Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter your friend's e-mail!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
          <div className="editFriend">
            <Form>
              <h1>Edit a friend!</h1>
              <FormGroup>
                <Label for="NameInput">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your friend's name!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="AgeInput">Age</Label>
                <Input
                  type="text"
                  id="age"
                  placeholder="Enter your friend's age!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="EmailInput">Email</Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter your friend's e-mail!"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button>Click the ✏ on the friend to edit</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsList;
