import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);  // Enregistre la réponse
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input id="exampleFile" name="file" type="file" onChange={handleFileChange} />
      </FormGroup>
      <Button onClick={handleSubmit}>Prédire</Button>
      {result && result.predicted_class && (
        <div>
          <h3>Résultat :</h3>
          <p>{result.predicted_class}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;

