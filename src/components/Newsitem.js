import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let {title,description, imgurl,newsUrl,author,date,source} = this.props
    return (
      <div className ='my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex: '1'}}> {source}+ </span>
          <img src={!imgurl?"https://img.etimg.com/thumb/msid-111850941,width-1200,height-630,imgsize-24476,overlay-etmarkets/photo.jpg":imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="badge bg-primary">New</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
            <a rel ="noreferrer" href={newsUrl} target = "_blank" className = "btn btn-dark btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
