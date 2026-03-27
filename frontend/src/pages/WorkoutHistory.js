import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts,removeWorkout } from '../redux/actions/workoutActions'; // Import deleteWorkout action
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons
//import useAuth from '../components/useAuth.js';
import './WorkoutHistory.css'; // For simple table styling

const WorkoutHistory = () => {
  const dispatch = useDispatch();
  
  // Get the workout list and error from Redux store
  const workoutsFromRedux = useSelector((state) => state.workouts.workoutList);
  const error = useSelector((state) => state.workouts.error);

  // Fetch workouts when the component mounts
 /*  useEffect(() => {
    if (token) {
      dispatch(fetchWorkouts()); // Fetch workouts only if the token is valid
    }
  }, [dispatch, token]); */

  useEffect(() => {
    // Only fetch if the list is empty
      dispatch(fetchWorkouts());
    
  }, [dispatch]);

  // Handle delete workout
    const handleDelete = (id) => {
      console.log('delid->',id)
    dispatch(removeWorkout(id));
  }; 

  if (error) {
    return <p className="error">Error fetching workouts: {error}</p>;
  }
  
  return (
    <div className="workout-history">
      <h2>Workout History</h2>
      {workoutsFromRedux.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="workout-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workoutsFromRedux.map((workout, index) => (
              <tr key={index}>
                <td>{new Date(workout.date).toLocaleDateString()}</td> {/* Assuming workout has a 'date' field */}
                <td>{workout.exercise}</td>
                <td>{workout.sets}</td>
                <td>{workout.reps}</td>
                <td>{workout.weight}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(workout._id)} 
                    className="delete-button"
                    aria-label="Delete workout"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkoutHistory;
