import React from 'react'
import { homeScreenStyles } from '@/assets'
import ProfileBanner from '@/components/ProfileBanner';
import Row from '@/components/Row';
import requests from '@/config/Requests';

const HomeUserScreen = () => {

    return (
        <div className='homeScreen'>
            <ProfileBanner />
            <div className='rows__wrapper'>
                <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

            </div>
        </div>
    )
}

export default HomeUserScreen