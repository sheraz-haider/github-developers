import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h1>About Page</h1>
      <p style={{marginBottom: '10px'}}>This app is called GitHub Developers. Utilizes GitHub public api to sreach for any github user and look at their information.</p>
      <p>Implementation:</p>
      <ul style={{listStyle: 'circle', margin: '10px 40px', }}>
        <li>Developed as a SPA using React.</li>
        <li>Used Context Api (alternative to redux) to manage app level state.</li>
        <li>Used Github public api to get developers and their information.</li>
        <li>Implemented routing to navigate through pages and show 404 when page not found.</li>
      </ul>
      <small><i>Copyright &copy; 2020</i></small>
    </Fragment>
  );
};

export default About;
