import React, { Component } from "react";
import "../../css/HomePage.scss";
import { connect } from "react-redux";
import { addBook } from "../../actions/bookActions";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    data: [],
    page: "",
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/book?page=1", {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          data: res.data,
          page: res.metadata.page,
        })
      );
  }

  loadNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className="homePage">
        <Link to="/basket">
          <i className="fa fa-shopping-cart homePage--icon"></i>
        </Link>
        <div className="homePage--wrapper d-flex justify-content-center mb-5">
          {this.state.data?.map((item) => (
            <div
              key={item.title}
              className="oneBook--wrapper col-12 col-md-5 col-xl-3 d-flex flex-column justify-content-center align-items-center"
            >
              <img
                src={item.cover_url}
                className="homePage--book mx-3"
                alt={item.cover_url}
              />
              <div className="d-flex flex-column">
                <h4 className="mt-2">{item.title}</h4>
                <h5>{item.author}</h5>
                <span>strony: {item.pages}</span>
              </div>
              <button
                className="mb-5 mt-3 btn btn-primary"
                onClick={() => this.props.addBook(item.id)}
              >
                DODAJ DO KOSZYKA
              </button>
            </div>
          ))}
        </div>
        <div className="homePage--button__wrapper d-flex"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addOne: state.addOne,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (id) => dispatch(addBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
