import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detail.css'


function Detail() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdataAnime = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                setAnime(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchdataAnime();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='detailpage'>
            <div>
                <br/>
                <h1 className='detailtitle'>{anime.title}</h1>
                <div className='isi'>
                    <div>
                        <img src={anime.images.jpg.image_url} alt={anime.title} />
                        <p>Score: {anime.score} <br/> Durasi: {anime.duration}</p>
                    </div>
                    <div className='isi-column'>
                        <br/><br/>
                        <p className='sinopsisdetail'>Sinopsis: {anime.synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
