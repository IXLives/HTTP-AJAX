import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
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
} from 'reactstrap';

class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: 0,
            email: '', 
        }
    }

    handleChange = e => {
        const { target } = e;
        const value = target.value;
        const id = target.id;
        this.setState({ id: value })
    }

    addAFriend ()  {
        const newFriend = this.state
        axios.post('http://localhost:5000/friends', {
            newFriend
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log('Error: ', err);
        })
    }

    render() {
        return(
            // Friend page wrapper
            <div className = 'friendPage'>
                {/* Friend list */}
                <div className = 'friendList'>
                    <h1>Your Friends</h1>
                    <div className = 'friendCards'>
                        {this.props.friends.map((friend) => {
                            return (
                                <Card>
                                    <CardBody>
                                        <CardTitle>{friend.name}</CardTitle>
                                        <CardText>{friend.age}</CardText>
                                        <CardText>{friend.email}</CardText>
                                    </CardBody>
                                </Card>
                            )
                        })}
                    </div>
                </div>
                {/* New friend form */}
                <div className = 'addAFriend'>
                    <h1>Add a friend!</h1>
                
                    <Form onSubmit = {this.addAFriend()}>
                        <FormGroup>
                            <Label for = 'NameInput'>Name</Label>
                            <Input type = 'text' id = 'name' placeholder = "Enter your friend's name!" onChange = {this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for = 'AgeInput'>Age</Label>
                            <Input type = 'text' id = 'age' placeholder = "Enter your friend's age!" onChange = {this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for = 'EmailInput'>Email</Label>
                            <Input type = 'text'  id = 'email' placeholder = "Enter your friend's e-mail!" onChange = {this.handleChange}/>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default FriendsList;