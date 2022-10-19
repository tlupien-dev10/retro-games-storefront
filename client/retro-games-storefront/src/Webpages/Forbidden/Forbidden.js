import {Link} from "react-router-dom";

function Forbidden() {

    // button to return to login
    // message about logging in
    return (
    <div>
        <h1>Forbidden</h1>
        <p>If you should have access to this tool, your login may have expired. Please log in again.</p>
        <Link to="/login/forbidden" className="waves-effect waves-light btn-small">Log in</Link>
    </div>
    );
}

export default Forbidden