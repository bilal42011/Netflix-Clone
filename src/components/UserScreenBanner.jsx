import { useState, useEffect } from "react";
import axios from "@/config/axios";
import requests from "@/config/Requests";
import Banner from "./Banner";
import { userScreenBannerStyles } from "@/assets";


console.log(requests);

const UserScreenBanner = () => {
    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requests.fetchNetflixOriginals);
            setMovie(response?.data?.results[Math.floor(Math.random() * response?.data?.results.length - 1)]);
        }
        fetchData();
    }, [])

    console.log(movie);
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    return (
        <Banner image={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}` : "https://assets.nflxext.com/ffe/siteui/vlv3/b85863b0-0609-4dba-8fe8-d0370b25b9ee/aa3f04db-986c-4e24-b93a-d2728a853ad2/PK-en-20230731-popsignuptwoweeks-perspective_alpha_website_medium.jpg"}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
        </Banner>
    )
}

export default UserScreenBanner;