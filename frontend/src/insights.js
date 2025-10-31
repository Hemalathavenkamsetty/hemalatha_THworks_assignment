import React from 'react';

const Insights = ({ tasks }) => {
  const totalTasks = tasks.length;
  const openTasks = tasks.filter(task => task.status === 'Open').length;

  return (
    <div>
      <h2>Insights</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Open Tasks: {openTasks}</p>
    </div>
  );
};

export default Insights;
