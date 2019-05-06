import React from 'react';
import './App.css';

const cols = ['Summary', 'Value', 'Velocity', 'Quality', 'Team', 'Client'];
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

const summarizeRatings = (ratings) => (
  Math.sign(ratings.reduce((sum, rating) => sum + rating, 0))
);

const TeamRating = ({rating}) => (
  <td><img src={`images/rating-${dots['' + rating]}.png`} alt={rating}/></td>
)

const TeamRow = ({team, ratings}) => (
  <tr>
    <th>{team}</th>
    <TeamRating rating={summarizeRatings(ratings)} />
    { ratings.map((rating, index) => <TeamRating key={index} rating={rating} />)}  
  </tr>
)

const Dashboard = ({cols, data}) => (
  <table className="table">
    <thead>
      <tr><th>Team</th>{ cols.map(col => <th key={col}>{col}</th>)}</tr>
    </thead>
    <tbody>
      { Object.keys(data).map(team => <TeamRow key={team} team={team} ratings={data[team][0]} />)}
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
