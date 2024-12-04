import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
    const storedCandidates = localStorage.getItem('candidate');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
      }
      } catch (error) {
        console.error("Failed to parse candidates from localStorage:", error);
    }
  }, []);

  const removeFromStorage = (id: string) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    console.log(candidates)
    setCandidates(updatedCandidates);
    localStorage.setItem('candidate', JSON.stringify(updatedCandidates));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name (Username)</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.avatar_url} alt={candidate.name} /></td>
              <td>{candidate.name == null ? 'Not Available' : candidate.name} ({candidate.login == null ? 'Not Available' : candidate.login})</td>
              <td>{candidate.location == null ? 'Not Available' : candidate.location}</td>
              <td>{candidate.email== null ? 'Not Available' : candidate.email}</td>
              <td>{candidate.company == null ? 'Not Available' : candidate.company}</td>
              <td>{candidate.bio == null ? 'Not Available' : candidate.bio}</td>
              <td><button className="button-red" onClick={() => removeFromStorage(candidate.id)}><span>-</span></button></td>
              </tr>
              ))}
        </tbody>
      </table>

    </>
  );
};

export default SavedCandidates;
