import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getUserById } from '../../redux/actions/getUserById'
export default function RatingCard({user_id}) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserById(user_id))
    }, [])
  return (
    <div className={style.footer}>
        <img id={style.imgProfile} src={photoDefault} alt="" />
        <div id={style.rating}>
        <Rating
        size="small"
        value={driver.rating}
        readOnly
        />
        <span id={style.driverRating}>{driver.rating}</span>
        <span id={style.amountReviews}>({driver.amountReviews})</span>
        </div>
        <div id={style.driverInfo}>
                <span>Conductor: </span>
                <span>{user.name} {user.last_name}</span>
        </div>
    </div>
  )
}
