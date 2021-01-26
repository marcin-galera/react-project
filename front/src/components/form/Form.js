import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/Form.scss";
import { withRouter } from "react-router-dom";

class Form extends Component {
  state = {
    status: "",
    firstName: "",
    lastName: "",
    city: "",
    zipCode: "",
  };

  componentDidUpdate() {
    if (this.state.status) {
      <Link to="/" />;
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleForm = (e) => {
    e.preventDefault();

    let { firstName, lastName, city, zipCode } = this.state;

    this.props.addOne.map((book) => {
      let tempState = {
        order: [
          {
            id: book,
            quantity: 1,
          },
        ],
        first_name: firstName,
        last_name: lastName,
        city: city,
        zip_code: zipCode,
      };

      if (
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        city.length >= 3 &&
        zipCode.length >= 3
      ) {
        fetch(`http://localhost:3001/api/order`, {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(tempState),
        })
          .then(() =>
            this.setState({
              status: "Poprawnie wysłano, przejdź na stronę główną",
            })
          )
          .then(() => {
            setTimeout(() => {
              this.props.history.push("/");
            }, 3000);
          });
      } else {
        console.error("za mało znaków w inputach");
      }
      return tempState;
    });
  };

  render() {
    return (
      <>
        <Link to="/">
          <div className="my-3 mx-3">Home</div>
        </Link>
        <div className="my-3 ml-5 form-status">{this.state.status}</div>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div className="form-group col-10 col-lg-5 mt-4">
            <label htmlFor="exampleFormControlInput1">
              Dane do doręczenia:
            </label>
            <input
              type="text"
              className="form-control mb-3 mt-2"
              id="firstName"
              placeholder="Imię"
              onChange={(e) => this.changeInput(e)}
            />
            <input
              type="text"
              className="form-control mb-3"
              id="lastName"
              placeholder="Nazwisko"
              onChange={(e) => this.changeInput(e)}
            />
            <input
              type="text"
              className="form-control mb-3"
              id="city"
              placeholder="Miejscowość"
              onChange={(e) => this.changeInput(e)}
            />
            <input
              type="text"
              className="form-control mb-3"
              id="zipCode"
              placeholder="Kod-pocztowy"
              onChange={(e) => this.changeInput(e)}
            />
            <button
              onSubmit={(e) => this.handleForm(e)}
              className="btn btn-primary"
            >
              send
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addOne: state.bookReducer.addOne,
  };
};

export default withRouter(connect(mapStateToProps, null)(Form));
