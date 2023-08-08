import { useState, useEffect } from "react";
import axios from "@/config/axios"
import { rowStyles } from "@/assets"

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    console.log(movies);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(fetchUrl);
            setMovies(response?.data?.results);

        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <div className="row__contents">
                <h2>{title}</h2>
                <div className="row__posters">
                    {movies.map((movie) => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            key={movie.id} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Row;