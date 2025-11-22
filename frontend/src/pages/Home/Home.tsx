import farsLogo from "../../assets/FARS_logo.png";
import VantaBackground from "../../components/VantaBackground/VantaBackground";
import "../../styles/_home.scss";
import homebg from "../../assets/360_F_428871097_74QTIx9LRjJSBTnknjFlX2pSTRIL1edy.jpg"

function Home() {
    return <>
      <div className="home">
        <div className="home-title-container">
          <div className="home-titles">
            <div className="fars-logo-container">
              <img src={farsLogo} className="fars-center-logo"/>
            </div>
            <h1 className="home__title">Welcome to Line Manager</h1>
          </div>
          <div className="bg-container">
              <img src={homebg} className="background-img" />
          </div>
        </div>
      </div>
    </>
}

export default Home;