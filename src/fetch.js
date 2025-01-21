import React, { useEffect, useState } from 'react';

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetch('https://jnbyk1y0q1.execute-api.us-east-1.amazonaws.com/production')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Store fetched data in the state
        setLoading(false); // Update loading state
      })
      .catch((error) => {
        setError(error.message); // Handle errors
        setLoading(false); // Update loading state
      });
  }, []);

  // Display loading or error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render the fetched data
  return (
    <div>
      <h1>Data from API:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
