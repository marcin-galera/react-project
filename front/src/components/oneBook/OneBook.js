import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../css/OneBook.scss";

class OneBook extends Component {
  state = {
    book: [],
    isChecked: false,
  };

  componentDidMount() {
    let books = this.props.addOne;

    books.map((book) => {
      fetch(`http://localhost:3001/api/book/${book}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => {
          let tempBooks = this.state.book;
          tempBooks.push(res.data);
          this.setState({ book: tempBooks });
        });
      return book;
    });
  }

  handleDelete = (id) => {
    console.log(id);
    console.log(this.state.book);

    const newBooks = this.state.book.filter((oneBook) => {
      return oneBook.id !== id;
    });
    this.setState({
      book: [...newBooks],
    });
  };

  render() {
    return (
      <div>
        <Link to="/">
          <div className="my-3 mx-3">Home</div>
        </Link>
        <div className="wrapper">
          {this.state.book.map((item) => {
            return (
              <>
                <div
                  className="onebook--wrapper my-5 col-8 col-sm-4 d-flex flex-column align-items-center"
                  key={item.title}
                >
                  <button
                    className="onebook--delete btn btn-danger"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Usuń
                  </button>
                  <img src={item.cover_url} alt={item.title} />
                  <h4 className="text-center">{item.title}</h4>
                  <h5>{item.author}</h5>
                </div>
              </>
            );
          })}
          <Link to="/form">
            <button className="choiceBook btn btn-primary">Dalej</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addOne: state.bookReducer.addOne,
  };
};

export default connect(mapStateToProps, null)(OneBook);
