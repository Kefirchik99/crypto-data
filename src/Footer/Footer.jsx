import React from 'react';
import '../styles/Footer.scss';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';

const Footer = ({ theme }) => {
    return (
        <footer className={`footer ${theme === 'dark' ? 'dark-mode' : ''}`}>
            <div className="footer-container">
                <div className="footer-social">
                    <a href="https://github.com/Kefirchik99/crypto-data" target="_blank" aria-label="GitHub"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/yaroslav-yermakovich-76b7845b/" target="_blank" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href="https://yermachine.eu" target="_blank" aria-label="Website"><FaGlobe /></a>

                </div>
                <div className="footer-info">
                    <p><a href="https://yermachine.eu"><strong>Contact us</strong></a></p>

                    <p>
                        <strong>
                            <a href="mailto:jermakent@gmail.com"></a>
                        </strong>
                    </p>

                    <p>&copy; {new Date().getFullYear()} Yermachine Web Design Studio | Crypto Olive</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;