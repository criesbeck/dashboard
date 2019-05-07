import React from 'react';
import './App.css';

const cols = ['Value', 'Velocity', 'Quality', 'Team', 'Client'];
const data = {
  "Blue": [[1, 1, 0, -1, 1], [1, 1, 0, 1, 0]],
  "Green": [[1, 1, 0, 1, 1], [1, 1, 0, 0, 1]],
  "Orange": [[-1, 1, 0, 0, -1], [0, 1, 0, 0, 0]]
};

const iconUrl = (data, index) => {
  const newRating = data[0][index];
  const oldRating = data[1][index];
  const color = newRating > 0 ? 'green' : newRating < 0 ? 'red' : 'yellow';
  const suffix = newRating > oldRating ? '-up' : newRating < oldRating ? '-down' : ''; 
  return `images/rating-${color}${suffix}.png`;
};

const ratingText = (data, index) => {
  const newRating = data[0][index];
  const oldRating = data[1][index];
  const state = newRating > 0 ? 'good' : newRating < 0 ? 'bad' : 'OK';
  const change = newRating > oldRating ? ', rising' : newRating < oldRating ? ', falling' : ', unchanged';
  return state + change;
};

const TeamRating = ({data, index}) => (
  <td><img src={iconUrl(data, index)} alt={ratingText(data, index)}/></td>
);

const TeamRow = ({team, data}) => (
  <tr>
    <th>{team}</th>
    { data[0].map((rating, index) => 
      <TeamRating key={index} data={data} index={index} />)}  
  </tr>
);

const Dashboard = ({cols, data}) => (
  <table className="table">
    <thead>
      <tr><th>Team</th>{ cols.map(col => <th key={col}>{col}</th>)}</tr>
    </thead>
    <tbody>
      { Object.keys(data).map(team =>
         <TeamRow key={team} team={team} data={data[team]} />)}
    </tbody>
  </table>
);


const App = () => (
  <div className="App">
    <h1>Team Dashboard</h1>
      <Dashboard cols={cols} data={data} />
  </div>
);

export default App;
