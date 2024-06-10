import React, { useState, useEffect } from 'react';
import './Usergoals.css';
import axios from 'axios';
import { utils as XLSXUtils, writeFile as writeXLSX } from 'xlsx';

function Usergoals() {
  const [goals, setGoals] = useState(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals'));
    return storedGoals || [];
  });
  const [newGoal, setNewGoal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleAddGoal = async () => {
    if (newGoal.trim()) {
      try {
        const response = await axios.post('http://localhost:8070/api/goals', { goal: newGoal });
        const addedGoal = response.data;
        setGoals([...goals, addedGoal]);
        setNewGoal('');
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    } else {
      alert("Please enter a goal before adding.");
    }
  };

  const handleDeleteGoal = async (goalId, index) => {
    const confirmed = window.confirm("Are you sure you want to delete this goal?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8070/api/goals/${goalId}`);
        const updatedGoals = [...goals];
        updatedGoals.splice(index, 1);
        setGoals(updatedGoals);
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const handleEditGoal = async (goalId, updatedGoal, index) => {
    try {
      await axios.put(`http://localhost:8070/api/goals/${goalId}`, { goal: updatedGoal });
      const updatedGoals = [...goals];
      updatedGoals[index] = { ...updatedGoals[index], goal: updatedGoal };
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const generateReport = () => {
    const reportContent = goals.map((goal, index) => ({ Goal: goal.goal }));
    const worksheet = XLSXUtils.json_to_sheet(reportContent);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Goals');
    writeXLSX(workbook, 'goals_report.xlsx');
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const filteredGoals = goals.filter(goal => {
    if (goal && typeof goal.goal === 'string' && typeof searchTerm === 'string') {
      return goal.goal.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="heading">Setup Your Goals</h2>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <input
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Enter your goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddGoal} style={{ backgroundColor: '#4e0c5e', borderColor: '#4e0c5e' }}>
            Add Goal
          </button>
          <button className="btn btn-primary mb-3" onClick={generateReport} style={{ backgroundColor: '#4e0c5e', borderColor: '#4e0c5e', marginTop: '10px' }}>
            Generate Report
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="heading">Previous Goals</h2>
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search goals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ul className="list-group custom-list">
        {filteredGoals.map((goal, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center custom-list-item" key={index}>
            {goal.goal && <span>{goal.goal}</span>}
            <div>
              <button className="btn btn-warning me-2" onClick={() => handleEditGoal(goal._id, prompt("Update goal:", goal.goal), index)} style={{ backgroundColor: '#4e0c5e', color: 'white', borderColor: '#4e0c5e' }}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteGoal(goal._id, index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usergoals;
