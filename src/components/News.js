import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            progress: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        this.setState({ loading: true, progress: 10 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0000b26e5d5c4faea0e762a7574fbc32&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(`Fetching news from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Network response was not ok');
            this.setState({ loading: false, progress: 100 });
            return;
        }
        const parsedData = await response.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            progress: 100
        });
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.fetchNews();
        });
    };

    render() {
        return (
            <div className="container my-3">
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    onLoaderFinished={() => this.setState({ progress: 0 })}
                />
                <h1 className="text-center" style={{ margin: '45px 0px', marginTop: '90px' }}>NewsMonkey - Top Headlines on {this.props.category}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News;
