import farsLogo from "../../assets/FARS_logo.png";
import VantaBackground from "../../components/VantaBackground/VantaBackground";
import '../../styles/_home.scss';

function Home() {
    return <>
      <div className="home">
        <VantaBackground/>
        <div className="home-title-container">
          <div className="home-titles">
            <div className="fars-logo-container">
              <img src={farsLogo} className="fars-center-logo"/>
            </div>
            <h1 className="home__title">Welcome to Line Manager</h1>
          </div>
        </div>
      </div>
    </>
}

export default Home;