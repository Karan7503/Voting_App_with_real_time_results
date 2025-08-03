import { useEffect, useState } from "react";

const Home = () => {
  const [results, setResults] = useState([]);


  useEffect(()=>{
    const fetchResults = async ()=>{
      try{
        const res = await fetch("http://localhost:5000/api/v1/vote/results");
        const data = await res.json();
        setResults(data);
      }catch (error) {
        console.error("Error fetchinng results:" , error);

      }
    };

    fetchResults();

    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  

  return (

    <div>
      <h2>Live Voting Results</h2>
      {results.length === 0 ? (
        <p>No votes yet</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key= {result.candidateId}>
            {result.name} - {result.votes} vote(s)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
