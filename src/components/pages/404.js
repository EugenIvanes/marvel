import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <Link style={{display:"block",
                          textAlign:"center",
                          fontWeight:"bold",
                          fontSize:"24px",
                          padding:"10px",
                          backgroundColor:"rgb(247, 247, 247)"}} to="/">Back to main page</Link>
        </div>
    )
};
export default Page404;