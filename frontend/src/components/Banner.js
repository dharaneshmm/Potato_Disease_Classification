import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/plant2.png"; // Replace with your plant disease-related image
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [, setIndex] = useState(1);
  const period = 2000;

  const toRotate = ["Leaf Disease Detection", "Plant Health Analysis", "Pest Identification", "Nutrient Deficiency"];

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }, [isDeleting, loopNum, text, toRotate, period]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [tick, delta]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center justify-content-center text-center">
          <Col xs={12} md={8} xl={6}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>Plant Disease Prediction</h1>
                <p style={{ color: 'white' }}>
                    Leveraging deep learning to diagnose plant diseases and enhance crop health.
                </p>
                 <h3 className="txt-rotate" dataperiod="1000" data-rotate='["Leaf Disease Detection", "Plant Health Analysis", "Pest Identification", "Nutrient Deficiency"]'><span className="wrap">{text}</span></h3>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Plant Disease Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
