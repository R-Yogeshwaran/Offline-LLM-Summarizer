import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ResponsiveAppBar from '../components/navbar';
import axios from 'axios';
import image from './076_-loading_animated_dribbble_copy.gif'


function TextSum() {
  const [input1, setInput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [loading, setLoading] = useState(false); 
  
  const handleSummarize = () => {
    const data = {
      user_text: input1,
    };

    // Set loading to true when making the request
    setLoading(true);

    axios.post('http://127.0.0.1:5000/textsummarize', data)
      .then((response) => {
        // Handle the response from the Flask backend
        console.log("that" + response.data.summarized_text);
        setOutput2({
          output2:response.data.summarized_text
        })
        
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ backgroundColor: 'black', backgroundSize: 'contain', height: '722px', display: 'flex' }}>
        <Container fluid style={{ backgroundColor: 'black' }}>
          <Row className='m-5'>
            <Col style={{ height: 450, borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', borderRight: 'white' }}>
              <textarea
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder="Enter text or Paste the Text and Click 'Summarize' button"
                style={{ width: '100%', height: '100%', padding: 8, borderRadius: 20, color: 'black' }}
              />
            </Col>

            <Col style={{ height: 450, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' }}>
  <u><h3 style={{ textAlign: 'center' }}>Summarized Content</h3></u>

  {loading ? (
    <div style={{ width: '100%', height: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img style={{ marginTop: -70, width: 300 }} src={image} alt="Loading" />
      <span>Loading ...</span>
    </div>
  ) : (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <h6 style={{ color: 'grey' }} id='text'>{output2.output2}</h6>
    </div>
  )}
</Col>
          </Row>
          <div style={{ justifyContent: 'center', display: 'flex', }}>
            <Button onClick={handleSummarize}>Summarize</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default TextSum;
