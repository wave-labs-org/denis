import React from "react";
import styled from "styled-components";
import About from "./Homepage/About";
import Partners from "./Homepage/Partners";
import Timeline from "./Homepage/Timeline";
import Faq from "./Homepage/Faq";
import Navbar from "./Navbar";

const Container = styled.div`
    scroll-behavior: smooth;
    width: 100%;
    min-height: 100vh;
    overflow: visible;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 24px;
`;

const Content = styled.div`
    z-index: 2;
`;

const Contact = styled.p`
    margin: 10px auto !important;
    font-size: 14px;
    text-align: center;
`;

function Homepage() {
    return (
        <Container>
            <Navbar />
            <Content>
                <About />
                <Faq />
                <Partners />
                {/* <Timeline /> */}
            </Content>
            <Contact style={{ marginTop: "50px" }}>
                With support from MARE - Centro de Ciências do Mar e do
                Ambiente, ref.ª UID/04292/2025, DOI:
                https://doi.org/10.54499/UID/04292/2025.
            </Contact>
        </Container>
    );
}

export default Homepage;
