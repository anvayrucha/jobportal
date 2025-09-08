import { useNavigate } from "react-router-dom"
import "./index.css"
const Home = () => {
    const isLoggin = localStorage.getItem("isLoggin") === "true"
    const navigate = useNavigate()
    const hanldeLogin = ()=>{
        if(isLoggin){
            navigate("/jobs")

        }
        else{
            navigate("/login")
        }
    }
    return (
        <div>
            <div className="home-container">
                <h1>Find the Job That <br />Fits Your Life</h1>
                <p>Millions of people Searching for Jobs salary <br />information , Company reviews.Find the fits your <br /> abilities and potential</p>
                <div>
                    <button className="apply-button" onClick = {hanldeLogin}>Apply Job </button>
                </div>
            </div>
        </div>
    )
}
export default Home;