import { Link } from "react-router-dom";

function Button(props) {
    return (
        <Link to={props.url}>
            <button type="button">
                {props.text}
            </button>
        </Link>
    );
}

export default Button;