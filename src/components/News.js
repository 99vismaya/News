import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from  'react-infinite-scroll-component'


export class News extends Component {
    static defaultProps ={
        country: "in",
        pageSize: 2,
        category: "general"
    }
    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1)
    }

  constructor(props){
    super(props);
    this.state={
        articles: [],
        loading: false,
        page:1,
        totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - News`
  }
  async updateNews(pageNo){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
    this.props.setProgress(100)
}

    async componentDidMount(){
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf8694b5de924d9a96a1d69a03f397c9&page=1&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData);
      // this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults})
      this.updateNews();
  }

  handleNextClick = async () => {
  //   console.log("Next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ){
    
  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf8694b5de924d9a96a1d69a03f397c9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //       let data = await fetch(url);
  //       this.setState({loading:true})
  //       let parsedData = await data.json()
  //       console.log(parsedData);
  //       this.setState({
  //           page: this.state.page + 1,
  //           articles: parsedData.articles,
  //           loading: false

  // })}
  this.setState({ page: this.state.page + 1 });
  this.updateNews();
    
}

handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf8694b5de924d9a96a1d69a03f397c9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // this.setState({loading:true})
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
        // loading: false 
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
}

fetchMoreData = async () => {
  this.setState({ page: this.state.page + 1 })
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
  })
};

  render() {
    return (
      <>
      <h1 className="text-center">News- Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
      {this.state.loading &&<Spinner/>}
      <InfiniteScroll
      dataLength={this.state.articles.length}
      next={this.fetchMoreData}
      hasMore={this.state.articles.length < this.state.totalResults}
      loader={<Spinner/>}
      >
        
      <div className ="container">
      <div className = 'row '>
      {/* {!this.state.loading&&this.state.articles.map((element)=>{  for loading without infinite scroll*/ }
      {this.state.articles.map((element)=>{
        return <div className = 'col-md-4' key = {element.url}>
    <Newsitem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imgurl = {element.urlToImage} newsUrl = {element.url}
    author = {element.author} date={element.publishedAt} source ={element.source.name}/>
    </div>
    })}
    </div>
    </div>
    </InfiniteScroll>

    {/* <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
    </div> */}
      
      </>
    )
  }
}

export default News
