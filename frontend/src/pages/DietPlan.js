import React, { useState,useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal,getMeal,removeMeal } from '../redux/actions/dietActions';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';
import './DietPlan.css'; // Custom styles for enhancements

const DietPlan = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getMeal())
  },[dispatch])

  const meals = useSelector((state) => state.meals.mealList);

  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState(''); // New state for protein
  const [fats, setFats] = useState(''); // New state for fats
  const [carbs, setCarbs] = useState(''); // New state for carbs
  const [date, setDate] = useState(''); // New state for date
  const [error, setError] = useState(null);
  const [showModal,setShowModal] = useState(false)
  const [mealId,setMealId] = useState('')

  // Calculate total calories
  //const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = (e) => {
    e.preventDefault();
    // Validation
    if (!meal || !calories || !protein || !fats || !carbs || !date || calories <= 0 || protein<=0 || fats<=0 || carbs<=0) {
      setError('Please enter valid meal details and ensure calories are a positive number.');
    } else {
      dispatch(addMeal({ 
        meal: meal, 
        calories: parseInt(calories), 
        proteins: parseFloat(protein), // Convert protein to a number
        fats: parseFloat(fats),       // Convert fats to a number
        carbs: parseFloat(carbs),     // Convert carbs to a number
        date: new Date(date).toISOString().split('T')[0] // Format date
      }));
      // Reset fields
      setMeal('');
      setCalories('');
      setProtein('');
      setFats('');
      setCarbs('');
      setDate('');
      setError(null);
    }
  };

  const handleDeleteClick = (id) => {
    setMealId(id)
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeMeal(mealId))
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Diet Plan</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddMeal}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Meal</Form.Label>
              <Form.Control
                type="text"
                value={meal}
                placeholder="Enter meal name"
                onChange={(e) => setMeal(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={calories}
                placeholder="Enter calories"
                onChange={(e) => setCalories(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Protein (g)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={protein}
                placeholder="Enter protein"
                onChange={(e) => setProtein(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Fats (g)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={fats}
                placeholder="Enter fats"
                onChange={(e) => setFats(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Carbs (g)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={carbs}
                placeholder="Enter carbs"
                onChange={(e) => setCarbs(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">Log Meal</Button>
      </Form>

      {/* Responsive meal cards */}
      <Row className="mt-4">
        {meals.length === 0 ? (
          <p>No meals logged yet.</p>
        ) : (
          meals.map((meal, index) => (
            <Col md={4} key={index}>
              <Card className="mb-4 shadow-sm meal-card">
                <Card.Body>
                <button
                 className="delete-icon"
                 onClick={() => handleDeleteClick(meal._id)} 
                >
                  <FaTrashAlt />
                </button>
                  <Card.Title className='display-7 mb-3'><strong>{meal.meal}</strong></Card.Title>
                  <Card.Text><strong>Calories:</strong> {meal.calories}</Card.Text>
                  <Card.Text><strong>Protein:</strong> {meal.proteins} g</Card.Text>
                  <Card.Text><strong>Fats:</strong> {meal.fats} g</Card.Text>
                  <Card.Text><strong>Carbs:</strong> {meal.carbs} g</Card.Text>
                  <Card.Text><strong>Date:</strong> {new Date(meal.date).toLocaleDateString()}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
        <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this meal?"
      />
      </Row>
    </Container>
  );
};

export default DietPlan;
