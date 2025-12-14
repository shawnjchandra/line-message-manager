import farsLogo from "../../assets/FARS_logo.png";
import { motion } from "framer-motion";
import "./Home.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
    <div className="home">
      {/* Header */}
      <section id="home" className="main-section">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('home.title', 'Welcome to Line Manager')}
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('home.automation', 'Automation for your LINE Template Message distribution on a whole another scale')}
            </motion.p>
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button className="btn btn-primary btn-large">
                <Link to="/workspace"> {t("home.lets", "Let's Get Started")}</Link>
                
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          <img src={farsLogo} alt="FARS" className="fars-pict" />

              {/* <image s> */}
          </motion.div>
        </div>

        <div className="wave-container">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Home;