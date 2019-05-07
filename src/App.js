import React from 'react';
import './App.css';

const cols = ['Value', 'Velocity', 'Quality', 'Team', 'Client'];
const data = {
  "Blue": [[1, 1, 0, -1, 1], [1, 1, 0, 1, 0]],
  "Green": [[1, 1, 0, 1, 1], [1, 1, 0, 0, 1]],
  "Orange": [[-1, 1, 0, 0, -1], [0, 1, 0, 0, 0]]
};

const dots = {
  '1': 'green',
  '0': 'yellow',
  '-1': 'red'
};

const suffices = {
  '1': '-up',
  '0': '',
  '-1': '-down'
};

const deltas = history => (
  (fn => history[0].map(fn))(history.length < 2 ? x => 0 : (x, i) => x - history[1][i])
)

const TeamRating = ({rating, delta}) => (
  <td><img src={`images/rating-${dots[rating]}${suffices[delta]}.png`} alt={rating}/></td>
)

const TeamRow = ({team, ratings, deltas}) => (
  <tr>
    <th>{team}</th>
    { ratings.map((rating, index) => 
      <TeamRating key={index} delta={deltas[index]} rating={rating} />)}  
  </tr>
)

const Dashboard = ({cols, data}) => (
  <table className="table">
    <thead>
      <tr><th>Team</th>{ cols.map(col => <th key={col}>{col}</th>)}</tr>
    </thead>
    <tbody>
      { Object.keys(data).map(team =>
         <TeamRow key={team} team={team}
          ratings={data[team][0]} deltas={deltas(data[team])} />)}
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
