import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

    constructor(props) {
        super();

        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName= this.onChangelastName.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
  //    this.onChangeuserType = this.onChangeuserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
         //   userType: ''
        }
    }

    onChangefirstName(e) {
        this.setState({
          firstName: e.target.value
        });
    }

    onChangelastName(e) {
        this.setState({
          lastName: e.target.value
        });
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangepassword(e) {
      this.setState({
          password: e.target.value
      });
  }
  /* onChangeuserType(e) {
    this.setState({
        userType: e.target.value
    });
} */

    onSubmit(e) {
        e.preventDefault();

        const user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
    //    userType: this.state.userType
      };
        axios.post('http://localhost:5000/auth/signup', user)
        .then((result) => {
            this.props.history.push("/loginscreen")
          });

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
       //   userType: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
            <div className="jumbotron">
            <h1> 
            <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
           </h1>      
           </div>
            <h3><b>Register to SEER{" "}</b></h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>First Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.firstName}
                                placeholder="John"
                                onChange={this.onChangefirstName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input 
                                type="text"  
                                className="form-control"
                                value={this.state.lastName}
                                placeholder="Doe"
                                onChange={this.onChangelastName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                placeholder="john@example.com"
                                onChange={this.onChangeemail}
                                />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.password}
                                placeholder="********"
                                onChange={this.onChangepassword}
                                />
                    </div>
                    {/* <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Role :</label>
                                    <select className="form-control" name="role" onChange={this.onChangeuserType}>
                                        <option selected>Select Role</option>
                                        <option value="1">Searcher</option>
                                        <option value="2">Submitter</option>
                                        <option value="3">Moderator</option>
                                        <option value="4">Analyst</option>
                                        <option value="4">Admin</option>
                                    </select>
                                </div>
                            </div> */}
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default Create;
