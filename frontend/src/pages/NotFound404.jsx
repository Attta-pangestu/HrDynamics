import React from 'react';
import notfoud404 from '../assets/svg/404-not-found.svg'

const NotFound = () => {
  return (
    <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <img src={notfoud404} alt="404-not-found" style={{
        width: "70vw", // Responsive to viewport width
        maxWidth: "350px", // Set a maximum width
      }}/>

      <h1 style={{
        marginTop: "30px",
        fontSize: "3vw", // Responsive font size
        color: "#3f3d56",
        textAlign: "center",
      }}>
        You seem to be lost.
      </h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"
      }}>
        <a href="/" className="btn btn-lg home-btn-404" >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
