import { useContext } from "react";
import { Outlet } from "react-router";
import { UserContext } from "../AppRoutes";

//Component to maintain post routers
export default function PostProtection() {
    const UserC = useContext(UserContext);
    return (
        <div>
            {/* Only if he has a token allows access to children.*/}
            {(UserC.token) && <Outlet />}
        </div>
    )
}
