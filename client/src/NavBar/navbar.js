import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

//logo
import logo from "../NavBar/logo-ondrive.png"

//componentes
import SearchBar from "../SearchBar/searchbar";

//falta importar las acciones de redux

export default function NavBar() {

    //dispatch
    //const dispatch = useDispatch()

    //handlers
    const handleClick = (e) => {
        e.preventDefault();

        window.location = "http://localhost:3000/home"
    }


    return (
        <nav>
            <div>
                <NavLink exact to="/home" onClick={(e) => handleClick(e)}>
                    <img src={logo} />
                </NavLink>
            </div>
            <div>
                <NavLink exact to="/features">Features</NavLink>
            </div>
            <div>
                <NavLink exact to="/pricing">Pricing</NavLink>
            </div>
            <div>
                <NavLink exact to="/community">Community</NavLink>
            </div>
            <div>
                <NavLink exact to="/support">Support</NavLink>
            </div>
            <div>
                <NavLink exact to="/login">Login</NavLink>
            </div>
            <div>
                <NavLink exact to="/register">Register</NavLink>
            </div>
            <div>
                <SearchBar />
            </div>
        </nav>
    )
}