import React from "react";
import './styles/FooterStyle.css'
import {Link} from 'react-router-dom'

const footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="linha">
                <div className = "listaNomes">
                    <h4>Feito por: </h4>
                        <a target="githubEdson" href="https://github.com/cizeskiedson">Edson Cizeski, </a>
                        <a target="githubHudson" href="https://github.com/Hudsox/">Hudson Rogerio, </a>
                        <a target="githubMichely" href="https://github.com/MichelyTamessawa">Michely Tamessawa, </a>
                        <a target="githubMaeda" href="https://github.com/ossamumaeda">Gabriel Maeda </a>
                </div>
            </div>
            <hr />
            <div className = "row">
                <p className="colAno">
                    &copy;{new Date().getFullYear()} Ciência da Computação UEM
                </p>
            </div>
        </div>
    </footer>
  );
}

export default footer;