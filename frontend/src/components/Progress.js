import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../redux/actions/workoutActions';
import { getMeal } from '../redux/actions/dietActions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for chart.js to function  

const Progress = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  const workouts = useSelector((state) => state.workouts.workoutList);
  const diets = useSelector((state) => state.meals.mealList);

  const workoutChartData = {
    labels: workouts.map(workout => new Date(workout.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Volume',
        data: workouts.map(workout => workout.volume),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };
  console.log('workouts=>'+JSON.stringify(workouts)); // Add this to verify the data
  
  const dietData = {
    labels: diets.map((meal) => new Date(meal.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories',
        data: diets.map((meal) => meal.calories),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Proteins',
        data: diets.map((meal) => meal.proteins),
        backgroundColor: 'rgba(24, 69, 230, 0.8)',
      },
    ],
  };
  return (
    <div>
      
  {workouts.length > 0 ? (
     <Container className="mt-4">
      <h2 className="text-center">Your Fitness Progress</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center">Workout Progress</h3>
          <Line data={workoutChartData} />
        </Col>
        <Col md={6}>
          <h3 className="text-center">Diet Progress</h3>
          <Line data={dietData} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Workouts Logged</Card.Title>
              <Card.Text>{workouts.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total deits logged</Card.Title>
              <Card.Text> {diets.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
 
  ) : (
    <p>No workouts / diets logged yet.</p>
  )} 
    </div>
  )
}

export default Progress