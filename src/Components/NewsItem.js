import React from 'react'

const NewsItem = (props) =>  {

        // props is an object and we are pulling title,description,imgUrl,newsUrl from it to display it as title,description,image,news. this process is known as destructuring
        let {title,description,imgUrl,newsUrl,author,date,source}=props
        return (
            <div>
               <div className="card" style={{width: '18rem'}}>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {source}
                    </span>
                    <img src={imgUrl?imgUrl:"https://cdn.vox-cdn.com/thumbor/Vmabvy_JzygMs_5vzL_RDZQ8GOY=/0x146:2040x1214/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22215403/acastro_210104_1777_google_0001.jpg"} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More..</a>
                    </div>
                </div>
            </div> 
        )
    
}

export default NewsItem
