// import { AuthContext } from "../Context/AuthContext";
// import { useContext } from "react";
// import Login from "../Components/Login";
// import Welcome from "../Components/Welcome";
import DashboardButtons from "../components/DashboardButtons";

const HomePage = () => {
    // const { user } = useContext(AuthContext);

    return (
        <>
       
          <h1 className="text-blue-950">HOME</h1>
          <DashboardButtons></DashboardButtons>
           
        </>


    );
}

export default HomePage;