import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super();

        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
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


  onSubmit(e) {
        e.preventDefault();

        const loggeduser = {
          email: this.state.email,
          password: this.state.password
      };

        axios.post('/auth/signin', loggeduser)
        .then(res => {
            if (res.status === 200) {
              localStorage.setItem('jwtToken', res.data.token);
              this.props.history.push("/userpage");
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            alert("Error logging in please try again");
          });

        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
                <h3>Login to SEER</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeemail}
                                />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangepassword}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;