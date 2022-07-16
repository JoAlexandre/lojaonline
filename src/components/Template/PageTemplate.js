import { Outlet } from "react-router";
import NavbarMovies from "../navbar/NavbarMovies";

export function PageTemplate({children}){
    return(
        <>
            <NavbarMovies/>
            {children}
            <Outlet />
        </>
    )
}