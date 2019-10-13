import React, { Component } from 'react';

class App extends Component {
  state = {
    response: [],
    slideIndex: 1
  };

  style = {
    img: { width: '100%', marginBottom: '10px' },
    imgFull: { width: '100%', height: '100%' },
    div: { paddingRight: '0px', paddingLeft: '0px', padding: '5px' }
  };

  componentDidMount() {
    fetch(
      'https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0'
    )
      .then(res => res.json())
      .then(json => this.setState({ response: json }));
  }

  showSlide = i => {
    this.setState({ slideIndex: i });
  };

  changeSlide = n => {
    const { response, slideIndex } = this.state;
    let i = slideIndex + n;

    if (i >= response.length) {
      i = 1;
    }
    if (i < 0) {
      i = response.length - 1;
    }
    this.setState({ slideIndex: i });
  };

  fullImage = () => {
    const { response, slideIndex } = this.state;

    if (response[slideIndex]) {
      return (
        <img src={response[slideIndex].urls.small} style={this.style.imgFull} />
      );
    }
  };

  render() {
    const { response, slideIndex } = this.state;

    var count = 1;
    var div1 = [];
    var div2 = [];
    var div3 = [];

    for (let i = 0; i < response.length; i++) {
      if (count === 4) {
        count = 1;
      }
      switch (true) {
        case count === 1:
          div1.push(
            <img
              src={response[i].urls.small}
              alt={response[i].urls.small}
              key={response[i].id}
              style={this.style.img}
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.showSlide.bind(this, i)}
            />
          );
          break;
        case count === 2:
          div2.push(
            <img
              src={response[i].urls.small}
              alt={response[i].urls.small}
              key={response[i].id}
              style={this.style.img}
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.showSlide.bind(this, i)}
            />
          );
          break;
        case count === 3:
          div3.push(
            <img
              src={response[i].urls.small}
              alt={response[i].urls.small}
              key={response[i].id}
              style={this.style.img}
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.showSlide.bind(this, i)}
            />
          );
          break;
        default:
          break;
      }
      count++;
    }

    return (
      <div className="container">
        <h1 className="text-center my-5">Gallery</h1>
        <div className="row">
          <div className="col-md-4" style={this.style.div}>
            {div1}
          </div>
          <div className="col-md-4" style={this.style.div}>
            {div2}
          </div>
          <div className="col-md-4" style={this.style.div}>
            {div3}
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">{this.fullImage()}</div>
              <div className="model-footer">
                <a
                  className="btn btn-primary text-light m-2"
                  onClick={this.changeSlide.bind(this, -1)}
                >
                  Prev
                </a>
                <a
                  className="btn btn-primary float-right text-light m-2"
                  onClick={this.changeSlide.bind(this, 1)}
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
