import React from 'react';
import './App.css';

const cols = ['Value', 'Velocity', 'Quality', 'Team', 'Client'];
const data = {
  "Blue": { '1557275714562': [1, 1, 0, -1, 1], '1556670914562': [1, 1, 0, 1, 0] },
  "Green": { '1557275714562': [1, 1, 0, 1, 1], '1556670914562': [1, 1, 0, 0, 1] },
  "Orange": { '1557275714562': [-1, 1, 0, 0, -1], '1556670914562': [0, 1, 0, 0, 0] }
};

const iconUrl = (rating, delta) => {
  const color = rating > 0 ? 'green' : rating < 0 ? 'red' : 'yellow';
  const suffix = delta > 0 ? '-up' : delta < 0 ? '-down' : ''; 
  return `images/rating-${color}${suffix}.png`;
};

const ratingText = (rating, delta) => {
  const state = rating > 0 ? 'good' : rating < 0 ? 'bad' : 'OK';
  const change = delta > 0 ? ', rising' : delta < 0 ? ', falling' : ', unchanged';
  return state + change;
};

const TeamRating = ({rating, delta}) => (
  <td><img src={iconUrl(rating, delta)} alt={ratingText(rating, delta)}/></td>
);

const TeamRow = ({team, data}) => {
  const history = Object.values(data);
  const now = history[0];
  const before = history[1];
  return (
    <tr>
      <th>{team}</th>
      { Object.values(now.map((rating, index) => 
        <TeamRating key={index} rating={rating} delta={rating-before[index]} />))
      }
    </tr>
  );
};

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
