import React, { useState,useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProgress,viewProgress,removeProgress } from '../redux/actions/transformationActions';
import { FaUpload, FaRuler, FaWeight,FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import './Transformation.css';

const Transformation = () => {
    const dispatch = useDispatch();
    const progressData = useSelector((state) => state.progress.progressList);
  
    const [weight, setWeight] = useState('');
    const [biceps, setBiceps] = useState('');
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null)
    const [showModal,setShowModal] = useState(false)
    const [progressId,setProgressId] = useState('')

    useEffect(() => {
      dispatch(viewProgress());
    }, [dispatch]);
  
    const handleImageUpload = (e) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setImagePreview(URL.createObjectURL(file));  // For displaying the preview
          setImage(file);  // Store the actual file for the upload
      } else {
          console.error("No file selected.");
      }
  };
   
    const handleAddProgress = (e) => {
      e.preventDefault();
      if (!weight || !date || !image) {
        alert('Please provide all required fields!');
        return;
      }
  
      const newProgress = { 
        weight: parseFloat(weight), 
        biceps: parseFloat(biceps) || 0, 
        chest: parseFloat(chest) || 0, 
        waist: parseFloat(waist) || 0, 
        date, 
        image 
      };
  
      dispatch(addProgress(newProgress));
      setWeight('');
      setBiceps('');
      setChest('');
      setWaist('');
      setDate('');
      setImage(null);
      setImagePreview(null);
      document.getElementById("fileInput").value = null;
      document.getElementById("imagePreview").value = null;
    };
  
    const handleDeleteClick = (id) => {
      setProgressId(id)
      setShowModal(true)
    }
    
    const handleConfirmDelete = () => {
      dispatch(removeProgress(progressId))
      setShowModal(false)
    }

    const handleCloseModal = () => setShowModal(false);

    return (
      <Container className="mt-4">
        <h2 className="text-center mb-4">Progress Tracker</h2>
        
        {/* Form to log new progress */}
        <Form onSubmit={handleAddProgress}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Weight (kg) <FaWeight /></Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={weight}
                  placeholder="Enter weight"
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
  
            <Col md={4}>
              <Form.Group>
                <Form.Label>Biceps (cm) <FaRuler /></Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={biceps}
                  placeholder="Enter biceps size"
                  onChange={(e) => setBiceps(e.target.value)}
                />
              </Form.Group>
            </Col>
  
            <Col md={4}>
              <Form.Group>
                <Form.Label>Chest (cm) <FaRuler /></Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={chest}
                  placeholder="Enter chest size"
                  onChange={(e) => setChest(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
  
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Waist (cm) <FaRuler /></Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={waist}
                  placeholder="Enter waist size"
                  onChange={(e) => setWaist(e.target.value)}
                />
              </Form.Group>
            </Col>
  
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
  
            <Col md={4}>
              <Form.Group>
                <Form.Label>Upload Progress Image <FaUpload /></Form.Label>
                <Form.Control
                  type="file"
                  id="fileInput"
                  onChange={handleImageUpload}
                  required
                />
                {imagePreview && <Image id="imagePreview" src={imagePreview} className="preview-image mt-2" rounded />}
              </Form.Group>
            </Col>
          </Row>
  
          <Button type="submit" variant="primary" className="mt-3">Log Progress</Button>
        </Form>
  
        {/* Display logged progress data */}
        <h4 className="mt-4">Previous Progress Entries</h4>
                <Row className="mt-3">
          {progressData.length === 0 ? (
            <p>No progress entries yet.</p>
          ) : (
            progressData.map((progress, index) => (
          <Col md={4} key={index}>
          <Card className="mb-4 shadow-sm progress-card h-100">
            <Card.Body className="d-flex align-items-center">
            <button
                 className="delete-icon"
                 onClick={() => handleDeleteClick(progress._id)} 
                >
                  <FaTrashAlt />
            </button>
              {/* Image on the Left */}
              <Image 
                src={`data:${progress.imageType};base64,${progress.image}`} 
                className="progress-image me-3" 
                style={{ width: '100px', height: 'auto' }} // Set a fixed width for the image
                rounded 
              />
              
              {/* Data on the Right */}
              <div style={{ flex: 1 }}>
                <Card.Text><strong>Weight:</strong> {progress.weight} kg</Card.Text>
                <Card.Text><strong>Biceps:</strong> {progress.biceps || 'N/A'} cm</Card.Text>
                <Card.Text><strong>Chest:</strong> {progress.chest || 'N/A'} cm</Card.Text>
                <Card.Text><strong>Waist:</strong> {progress.waist || 'N/A'} cm</Card.Text>
                <Card.Text><strong>Date:</strong> {new Date(progress.date).toLocaleDateString()}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
            ))
          )}
          <ConfirmationModal
          show={showModal}
          onHide={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this progress?"
         />
        </Row>
      </Container>
    );
  };

export default Transformation