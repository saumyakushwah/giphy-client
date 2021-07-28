import React from "react";

class ImageCard extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // this.state = { spans: 0 };

  //   this.imageRef = React.createRef();
  // }

  // componentDidMount() {
  // this.imageRef.current.addEventListener("load", this.setSpans);
  // console.log(this.imageRef.current.clientHeight); p.s. this works fine for me
  // }

  // setSpans = () => {
  //   const height = this.imageRef.current.clientHeight;

  //   const spans = Math.ceil(height / 10 + 1);

  //   this.setState({ spans });
  // };

  render() {
    // const {description, urls} = this.props.image;

    return <img alt="giphy" src={this.props.image} />;
  }
}

export default ImageCard;
