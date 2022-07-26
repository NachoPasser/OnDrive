import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCarsById} from "../../../redux/actions/getCarById.js"

export default function SelectCars() {
    const dispatch = useDispatch();
    const cars = useSelector(state => state.carById);

    useEffect(() => {
        dispatch(getCarsById(localStorage.getItem('token')));
    }
    , [dispatch]);
    return (
        <div>
            {  cars.length > 0 ? 
                <select>
                    {cars && cars.map((car, i) => <option value={i}>{car.model}</option>)}
                </select>
                :
                <select>
                    <option>No tienes autos</option>
                </select>
            }
        </div>
    )
}