import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

const course = '2019SP_EECS_394-0_SEC20_AND_MSAI_394-0_SEC1';
const cols = ['Value', 'Velocity', 'Quality', 'Team', 'Client'];

const firebaseConfig = {
  apiKey: "AIzaSyBnFvRcrQ9NYX567xdLz6TeQtC_c2NcyCI",
  authDomain: "nikofb.firebaseapp.com",
  databaseURL: "https://nikofb.firebaseio.com",
  projectId: "project-8223805973728040692",
  storageBucket: "project-8223805973728040692.appspot.com",
  messagingSenderId: "990043214791",
  appId: "1:990043214791:web:dca3f48c672837f9"
};

// FIREBASE
firebase.initializeApp(firebaseConfig);
const metricsRef = firebase.database().ref(course).child('metrics');

const subscribe = (fn) => { 
  metricsRef.on('value', fn, error => {
    console.log(error);
  });
};

const unsubscribe = (fn) => {
  metricsRef.off('value', fn);
};

const addToFb = (team, metrics) => {
  metricsRef.child(team).child('metrics').child(`${Date.now()}`)
    .set(metrics)
    .catch(reason => alert(reason));
};
// END FIREBASE

const metricIcon = (metric, delta) => {
  const color = metric > 0 ? 'green' : metric < 0 ? 'red' : 'yellow';
  const suffix = delta > 0 ? '-up' : delta < 0 ? '-down' : ''; 
  return `images/rating-${color}${suffix}.png`;
};

const metricText = (metric, delta) => {
  const state = metric > 0 ? 'good' : metric < 0 ? 'bad' : 'neutral';
  const change = delta > 0 ? ', rising' : delta < 0 ? ', falling' : ', unchanged';
  return state + change;
};

// simple prompt. allows commas and/or spaces.
const askForMetrics = () => {
  const text = prompt(`Enter numeric values for ${cols.join(', ')}`);
  if (!text) return null;
  // collect and convert to numbers
  const metrics = text.split(/[ ,]+/).filter(x => !isNaN(x)).map(x => + x);
  return (metrics.length === cols.length) ? metrics : askForMetrics();
};

const TeamButton = ({team}) => {
  const addMetrics = () => {
    const metrics = askForMetrics();
    if (metrics) {
      addToFb(team, metrics);
    }
  }
  return <button onClick={addMetrics}>{team}</button>;
};

const TeamMetric = ({metric, delta}) => (
  <td><img src={metricIcon(metric, delta)} alt={metricText(metric, delta)}/></td>
);

const TeamRow = ({team, data}) => {
  console.log(team)
  const defaultMetrics = cols.map(() => 0);
  const keys = data.metrics ? Object.keys(data.metrics).sort((x, y) => y - x) : [];
  const metrics = keys.length > 0 ? data.metrics[keys[0]] : defaultMetrics;
  const before = keys.length > 1 ? data.metrics[keys[1]] : metrics;
  console.log(metrics)
  console.log(before)
  return (
    <tr>
      <th><TeamButton team={team} /></th>
      { Object.values(metrics).map((metric, index) => 
          <TeamMetric key={index} metric={metric} delta={metric-before[index]} />)
      }
    </tr>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setData(snap.val());
    };
    subscribe(handleData);
    return () => { unsubscribe(handleData); };
  }, []);
  
  return (
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
};

const App = () => (
  <div className="App">
    <h1>Team Dashboard</h1>
      <Dashboard />
  </div>
);

export default App;
