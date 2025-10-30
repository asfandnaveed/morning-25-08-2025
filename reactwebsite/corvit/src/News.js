import { useState } from 'react';
import './News.css';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

// https://newsapi.org/v2/top-headlines?country=us&apiKey=9480aea0168c42e886a4cd472701c4b7

function News() {

    const [data, setData] = useState();
    const [loading, setLoading] =useState(true);
    

    fetch("https:newsapi.org/v2/top-headlines?country=us&apiKey=9480aea0168c42e886a4cd472701c4b7")
    .then(res=>res.json())
    .then(news => {
         setData(news);
        setLoading(false);
    });
   


    


    if(loading==true){
        return(
            <h1>Loading</h1>
        )
    };
    return (

        <div className="news-app">
            <div className="news-card">
                <img
                    src="https://dims.apnews.com/dims4/default/c5559a3/2147483647/strip/true/crop/5636x3170+0+299/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F32%2F64%2F0d29871581ea0abef1b7477d1e7d%2Ff5a93a23dbed4a7fbc7b0ce8df8e4ba2"
                    alt="Trump signs an executive order vowing to defend Qatar in the wake of Israel’s strike - AP News"
                    className="news-image"
                />
                <div className="news-content">
                    <div className="news-meta">
                        <span className="source">Associated Press</span>
                        <span className="date">10/2/2025</span>
                    </div>
                    <h2 className="title">
                        Trump signs an executive order vowing to defend Qatar in the wake of Israel’s strike - AP News
                    </h2>
                    <p className="description">
                        U.S. President Donald Trump has signed an executive order pledging to defend Qatar,
                        including using U.S. military action if necessary. The order emphasizes the close
                        cooperation and shared interests between the U.S. and Qatar. It follows Israel's
                        surprise attack…
                    </p>
                    <div className="author">By Jon Gambrell</div>
                    <a
                        href="https://apnews.com/article/us-qatar-security-trump-israel-hamas-de391ae9bded58bffb1f5b69777f35cf"
                        target="_blank"
                        rel="noreferrer"
                        className="read-more"
                    >
                        Read Full Article →
                    </a>
                </div>
            </div>
        </div>
    );
}


export default News;