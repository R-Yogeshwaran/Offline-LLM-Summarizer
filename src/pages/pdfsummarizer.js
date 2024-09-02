import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ResponsiveAppBar from '../components/navbar';
import image from './076_-loading_animated_dribbble_copy.gif';

function Pdf() {
  const [output2, setOutput2] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the Flask backend
      console.log("Response: " + JSON.stringify(response.data.txtoutput));

      setOutput2(response.data.txtoutput);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: 'black', backgroundSize: 'contain', height: '722px', display: 'flex' }}>
        <Container fluid style={{ backgroundColor: 'black' }}>
          <Row className='m-5'>
            <Col style={{ justifyContent: 'center', height: 450, flexDirection: 'column', backgroundColor: 'white', borderRadius: 20, display: 'flex', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '30px', order: 1 }}>Select Your PDF File</h3>
              <input
                type="file"
                style={{ order: 2 }}
                onChange={(e) => {
                  // Handle file selection here, but don't trigger upload here
                }}
              />
            </Col>

            <Col style={{ marginLeft: 5, height: 450, backgroundColor: 'white', borderRadius: 20 }}>
              <u><h3 style={{ textAlign: 'center' }}>Summarized Content</h3></u>
              {loading ? (
                <div style={{ width: '100%', height: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ marginTop: -70, width: 300 }} src={image} alt="Loading" />
                  <span>Loading ...</span>
                </div>
              ) : (
                <div style={{ height: '100%', overflowY: 'auto' }}>
                  <h6 style={{ color: 'grey' }}>{output2}</h6>
                </div>
              )}
            </Col>
          </Row>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Button onClick={() => {
              const inputElement = document.querySelector('input[type="file"]');
              if (inputElement.files.length > 0) {
                handleFileUpload(inputElement.files[0]);
              }
            }}>Summarize</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Pdf;
