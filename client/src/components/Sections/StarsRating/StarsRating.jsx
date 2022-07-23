import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import style from "./StarsRating.module.css";

export default function StartsRating(){

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return(
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;
                return(
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={ () => setRating(ratingValue) }
                        />
                        <FaStar 
                            className={style.star}
                            color={ ratingValue <= (hover || rating) ? "#fed428" : "#a7a1a1" }
                            size={50}
                            onMouseEnter={ () => setHover(ratingValue) }
                            onMouseLeave={ () => setHover(null) }
                        />
                    </label>
                );
            })}
            <p className={style.name}>{rating}</p>
        </div>
    )
}