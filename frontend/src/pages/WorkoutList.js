import React, { useState } from "react";
import { Container, Table, Button, Form, Row, Col, Card, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addWorkout} from "../redux/actions/workoutActions";
import { FaDumbbell, FaListOl, FaSortNumericUp, FaSyncAlt } from "react-icons/fa";
import "./Workouts.css";

function Workouts() {
  const dispatch = useDispatch();
  /* const workoutsFromRedux = useSelector((state) => state.workouts.workoutList); // Redux store for workouts */

  // Each workout row is an object with 'exercise', 'sets', 'reps', and 'weight'
  const [workouts, setWorkouts] = useState([{ exercise: "", sets: "", reps: "", weight: "" }]);
  const [errors, setErrors] = useState([]); // Validation errors

  // Validate each workout
  const validateWorkout = (workout) => {
    const newErrors = {};
    if (!workout.exercise) newErrors.exercise = "Exercise name is required";
    if (!workout.sets) newErrors.sets = "Number of sets is required";
    if (!workout.reps) newErrors.reps = "Number of reps is required";
    if (!workout.weight) newErrors.weight = "Weight is required";
    return newErrors;
  };

  // Handle field changes for individual workout rows
  const handleWorkoutChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][name] = value; // Update the specific field in the specific row
    setWorkouts(updatedWorkouts);
  };

  // Add new workout to the store and reset the form
  const handleAddWorkout = () => {
    let allErrors = false;
    const newErrorsArray = workouts.map((workout) => {
      const validationErrors = validateWorkout(workout);
      if (Object.keys(validationErrors).length > 0) {
        allErrors = true;
      }
      return validationErrors;
    });

    if (allErrors) {
      setErrors(newErrorsArray);
      return;
    }

    // Dispatch each workout to the Redux store
    workouts.forEach((workout) => {
      dispatch(addWorkout(workout));
    });

    // Reset the form with one empty row
    setWorkouts([{ exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors({});
  };

  // Add an empty row to the workout table
  const handleAddRow = () => {
    setWorkouts([...workouts, { exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors([...errors, {}]); // Add an empty error object for the new row
  };

  // Remove a workout row
  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setErrors(updatedErrors); // Remove validation errors for the deleted row
    //dispatch(removeWorkout(index)); // Dispatch remove workout action in Redux
  };

  // Summarize workouts
  const totalSets = workouts.reduce((total, workout) => total + Number(workout.sets || 0), 0);
  const totalReps = workouts.reduce((total, workout) => total + Number(workout.reps || 0), 0);
  const totalWeightLifted = workouts.reduce((total, workout) => total + Number(workout.weight || 0), 0);
  

  return (
    <Container className="workouts-page">
      <h2 className="text-center mb-4">Workout List</h2>

      {/* Display validation errors */}
      {errors.length > 0 && errors.some((err) => Object.keys(err).length > 0) && (
        <Alert variant="danger">
          Please fill out all required fields:
          {/* <ul>
            {errors.map((error, index) => (
              <React.Fragment key={index}>
                {error.exercise && <li>Row {index + 1}: {error.exercise}</li>}
                {error.sets && <li>Row {index + 1}: {error.sets}</li>}
                {error.reps && <li>Row {index + 1}: {error.reps}</li>}
                {error.weight && <li>Row {index + 1}: {error.weight}</li>}
              </React.Fragment>
            ))}
          </ul> */}
        </Alert>
      )}

      <Table striped bordered hover className="workout-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter exercise name"
                  name="exercise"
                  value={workout.exercise}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  isInvalid={!!errors[index]?.exercise}
                />
                <Form.Control.Feedback type="invalid">{errors[index]?.exercise}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Sets"
                  name="sets"
                  value={workout.sets}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  isInvalid={!!errors[index]?.sets}
                />
                <Form.Control.Feedback type="invalid">{errors[index]?.sets}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Reps"
                  name="reps"
                  value={workout.reps}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  isInvalid={!!errors[index]?.reps}
                />
                <Form.Control.Feedback type="invalid">{errors[index]?.reps}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Weight (kg)"
                  name="weight"
                  value={workout.weight}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  isInvalid={!!errors[index]?.weight}
                />
                <Form.Control.Feedback type="invalid">{errors[index]?.weight}</Form.Control.Feedback>
              </td>
              <td>
                <OverlayTrigger placement="top" overlay={<Tooltip>Add a new workout row</Tooltip>}>
                  <Button className="mx-2" variant="primary" onClick={handleAddRow}>+</Button>
                </OverlayTrigger>

                {workouts.length > 1 && (
                  <OverlayTrigger placement="top" overlay={<Tooltip>Remove this workout row</Tooltip>}>
                    <Button className="mx-2" variant="danger" onClick={() => handleRemoveWorkout(index)}> - </Button>
                  </OverlayTrigger>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="justify-content-center mb-4">
        <Col md={2}>
          <Button variant="success" onClick={handleAddWorkout}>Add New Workout</Button>
        </Col>
      </Row>

      {/* Workout Summary */}
      <div className="workout-summary">
        <h4 className="text-center mb-4">Workout Summary</h4>
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Body>
                <FaListOl size={50} className="mb-3 text-primary" />
                <Card.Title>Total Exercises</Card.Title>
                <Card.Text>{workouts.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Body>
                <FaSortNumericUp size={50} className="mb-3 text-success" />
                <Card.Title>Total Sets</Card.Title>
                <Card.Text>{totalSets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Body>
                <FaSyncAlt size={50} className="mb-3 text-info" />
                <Card.Title>Total Reps</Card.Title>
                <Card.Text>{totalReps}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Body>
                <FaDumbbell size={50} className="mb-3 text-warning" />
                <Card.Title>Total Weight Lifted (kg)</Card.Title>
                <Card.Text>{totalWeightLifted}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Workouts;
