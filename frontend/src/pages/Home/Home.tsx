import farsLogo from "../../assets/FARS_logo.png";
import "./Home.scss";
import homebg from "../../assets/360_F_428871097_74QTIx9LRjJSBTnknjFlX2pSTRIL1edy.jpg"
import { useTranslation } from "react-i18next";
import Spline from '@splinetool/react-spline';
import { Application } from "@splinetool/runtime";
import { useEffect, useRef } from "react";

function Home() {
    const { t } = useTranslation();
  
     const canvasRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        const app = new Application(canvasRef.current);
        app.load('https://prod.spline.design/QRjbfCGmFaFhk6DO/scene.splinecode');
      }
    }, []);
    return <canvas ref={canvasRef} />
    // <>
      {/* <div className="home"> */}
        {/* <div className="home-title-container">
          <div className="home-titles">
            <div className="fars-logo-container">
              <img src={farsLogo} className="fars-center-logo"/>
            </div>
            <h1 className="home__title">{t('home.title')}</h1>
          </div>
          <div className="bg-container">
              <img src={homebg} className="background-img" />
          </div>
        </div> */}
      {/* </div> */}
    // </>
}

export default Home;