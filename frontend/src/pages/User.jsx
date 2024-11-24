import { Link } from "react-router-dom";
const User = ({userId, name , avatar}) => {
    return (
        <>
        <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <h2>{name}</h2>
        </Link>
        </>
    );
};

export default User;