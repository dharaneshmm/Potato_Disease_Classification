import React, { useState } from 'react';
import axios from 'axios';

const PredictionPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            setError('');  // Clear any previous error
        }
    };

    const handlePredict = () => {
        if (!selectedImage) {
            setError('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedImage);

        axios.post('http://localhost:8003/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setPrediction(response.data.class);
            setError('');
        })
        .catch(error => {
            console.error('There was an error making the prediction!', error);
            setError('Error making prediction. Please try again.');
        });
    };

    const handleClear = () => {
        setSelectedImage(null);
        setPrediction('');
        setError('');
    };

    return (
        <div className="prediction-page">
            <div className="prediction-container">
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <h2>Upload Image:</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                        disabled={!!prediction}  // Disable input if a prediction is made
                    />
                </div>
                {!prediction && (
                    <button onClick={handlePredict} className="predict-button">
                        Predict
                    </button>
                )}
                {prediction && (
                    <>
                        <p className="prediction">Sportsperson Classified as: {prediction}</p>
                        <button onClick={handleClear} className="clear-button">
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PredictionPage;
