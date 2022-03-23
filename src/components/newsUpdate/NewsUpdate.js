import React, { useEffect, useState } from 'react'
import './../../styles/NewsUpdate.css'
import NewsCard from './NewsCard'

const NewsUpdate = ({ city }) => {
    console.log(city)
    const [news, setNews] = useState([])


    useEffect(() => {
        const fetchNews = async () => {
            let url = 'https://newsapi.org/v2/everything?' +
                'q=Apple&' +
                'from=2022-03-22&' +
                'sortBy=popularity&' +
                'apiKey=4ad92d7d2f924265b5498279ab16d989';

            let req = new Request(url);
            let response = await fetch(req)
            let data = await response.json()

            setNews(data.articles)
            console.log(data.articles)
        }
        fetchNews()
    }, [city])

    const renderNews = () => (
        news.map(info => (
            <NewsCard info={info}/>
        ))
    )

    return (
        <div className='news_update_wrapper'>
            <p>{`Recent ${city} News Update`}</p>
            <div className='news_update_listing'>
                {news && renderNews()}
            </div>
        </div>
    )
}

export default NewsUpdate