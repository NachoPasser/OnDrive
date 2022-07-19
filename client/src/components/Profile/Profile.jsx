import React, {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from "../../redux/actions/getUserById";
export default function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userById)
    useEffect(() => {
      dispatch(getUserById(localStorage.getItem('token')))
    }, [])
    
  return (
    <div>
        <div style={{color: 'white'}}>
            <span>{user.email}</span>
            <span>{user.name}</span>
            <span>{user.last_name}</span>
        </div>
    </div>
  )
}
