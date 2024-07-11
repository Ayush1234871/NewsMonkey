import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, desciption, imageUrl, newsurl, author, date } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl ? "https://image.cnbcfm.com/api/v1/image/108001900-1720162218135-gettyimages-2148794516-00612024.jpeg?v=1720364265&w=1920&h=1080" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desciption}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
