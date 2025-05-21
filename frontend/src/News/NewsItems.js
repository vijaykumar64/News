import React, { Component } from 'react';

export default class NewsItems extends Component {
  render() {
    let { title, description,imgUrl,url} = this.props;
    return (
      <div className='container mb-3'>
        <div className="card" >
          <img src={imgUrl} width="200px" height="200px" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}.</p>
            <a href={url}  className="btn btn-primary">{"Read More->"} </a>
          </div>
        </div>

       
      </div>
    );
  }
}
