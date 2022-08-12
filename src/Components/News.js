import React, { useEffect ,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {

     
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);


    const Capitalize=(str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const UpdateNews= async () => {
        props.loadingProgress(10);

         // &page and &pagesize are the parameters from NEWSAPI website
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e2aa2cc82c7645fe8b71bf40ac1a6e6e&page=${page}&pagesize=${props.pageSize}`

        setLoading(true)
        
        let data=await fetch(url)
        props.loadingProgress(40);
        let ParsedData=await data.json()
        props.loadingProgress(70);
 
       // setting state which consist of articles and totalResults with the ParcedData articles(parameter from API) and ParcedDATA totalResults(parameter from API)
       setArticles(ParsedData.articles)
       setTotalResults(ParsedData.totalResults)
       setLoading(false)
        
        
        props.loadingProgress(100);
 

    }



    // alternative to componentDidMount (which is a lifecycle method which runs after render method and it is used to fetch data from api) in function based componenet
    useEffect(() => {
        
        document.title=`NewsBox - ${Capitalize(props.category)}`         // to chnge the title of window a/c to the category
        UpdateNews();
        // eslint-disable-next-line
    },[]);
    
   
    

    // for infinitescroll (copied from internet)
    const fetchMoreData = async() => {
        
        // &page and &pagesize are the parameters from NEWSAPI website
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e2aa2cc82c7645fe8b71bf40ac1a6e6e&page=${page+1}&pagesize=${props.pageSize}`
        setPage(page+1)
        
        let data=await fetch(url)
        let ParsedData=await data.json()

      // setting state which consist of articles and totalResults and loading with the ParcedData articles(parameter from API) and ParcedData totalResults(parameter from API)
      //for fetchin more data for infinite scroll we will concatinate the articles inside the state with the new parcedData Articles
      setArticles(articles.concat(ParsedData.articles))
      setTotalResults(ParsedData.totalResults)
      setLoading(false)
      
      
        
    };

 
        return (
            <>
                <h1 className="text-center" style={{marginTop:"100px"}}>NewsBox - Top {Capitalize(props.category)} Headlines</h1>
                {/* if loading is true inside the state so display the spinner */}
                {loading && <Spinner/>}

                {/* below syntax copied from internet from https://codesandbox.io/s/yk7637p62z?file=/src/index.js:309-554 */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}      // if the length of articles is not equal to the total results so it means we have more articles.
                    loader={<Spinner/>}
                >
                
                <div className="container">

                    <div className="row my-5" >

                        {/* for looping of news */}
                        {/* if loading is not true inside state so display articles by mapping */}
                        {articles.map((item)=>{

                            return <div className="col-md-4 my-3" key={item.url}>
                                <NewsItem title={item.title?item.title.slice(0,40):""} description={item.description?item.description.slice(0,80):""} imgUrl={item.urlToImage} newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name}/>
                                  </div>


                            })}

                    </div>
                </div>

                </InfiniteScroll>

               
            </>  
        )
   
}

News.defaultProps ={
    pageSize:6,
    category:'sports',
    country:'us'
}
News.propTypes ={
    pageSize:PropTypes.number,
    category:PropTypes.string,
    country:PropTypes.string
}

export default News
