// import { useLocation, Link, Outlet } from "react-router-dom";
// import useAuth from "./Hooks/useAuth";

// const RequiredAuth = () => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.user ? <Outlet />
//         : <Link to="/login" state={{from: location}} replace />
//     );
// }

// export default RequiredAuth;