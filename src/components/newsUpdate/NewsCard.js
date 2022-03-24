import React, { useEffect, useState } from 'react'
import './../../styles/NewsCard.css'

const NewsCard = ({ info }) => {
    const [date, setDate] = useState('')

    const getDate = () => {
        let newDate = Intl.DateTimeFormat().format(
            new Date(info.publishedAt.toString())
        )
        setDate(newDate)
    }

    useEffect(() => {
        getDate()
    }, [info])
    
    return (
        <div className='news_card'>
            <div className='news_card_image'>
                <img alt='' src={info.urlToImage} />
            </div>
            <div className='news_card_body'>
                <a href={info.url}>{info.title}</a>
                <span>{date}</span>
            </div>
        </div>
    )
}

export default NewsCard