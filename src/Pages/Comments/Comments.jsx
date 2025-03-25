import React, { useState, useEffect } from 'react';
import './Comments.scss';
import { FaStar } from "react-icons/fa6";
import DataComments from '../../api/DataComments';

export default function Comments() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const commentsToShow = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % DataComments.length);
        }, 4000); // 8000 ms = 8 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Function to get a slice of comments to display
    const getVisibleComments = () => {
        const visibleComments = [];
        for (let i = 0; i < commentsToShow; i++) {
            visibleComments.push(DataComments[(currentIndex + i) % DataComments.length]);
        }
        return visibleComments;
    };

    const visibleComments = getVisibleComments();

    return (
        <section className="container-comments">
            <h2>O que nossos clientes dizem?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ab possimus sed harum! Eveniet, possimus? Iusto repudiandae autem, pariatur assumenda, maiores sapiente veritatis nostrum perferendis repellat debitis ipsam porro illo!</p>

            <article className='comments-center'>
                {visibleComments.map((comment, index) => (
                    <div className='comments-center-header' key={index}>
                        <div className='center-header-footer'>
                            <h3>{comment.nome}</h3>
                            <div>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar className='icon' key={i} />
                                ))}
                            </div>
                        </div>
                        <p>{comment.description}</p>
                    </div>
                ))}
            </article>
        </section>
    );
}
