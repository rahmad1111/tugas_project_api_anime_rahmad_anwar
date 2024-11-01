import React, { useState, useEffect } from 'react';
import "../styles/home.css";
import '../styles/loading.css';
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/anime');
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div class="custom-loader loading loading_div"></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="center-heading">
                <h1>
                    Top {data?.length} Anime
                    <br/>
                    <small>
                        Updated: {new Date(data?.[0].updated_at).toLocaleString()}
                    </small>
                </h1>
            </div>
            <div className="container">
                {data?.map((item) => (
                <Link to={`/detail/${item.mal_id}`}>
                    <button>
                        <div key={item.mal_id} className="grid-container">
                            <div className="grid-item">
                                <h4 className="title">{item.title}</h4>
                                <img className="images" src={item.images.jpg.image_url} alt={item.title} />
                                <p>Score: {item.score}</p>
                                <p>Durasi: {item.duration}</p>
                            </div>
                        </div>
                    </button>
                </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
