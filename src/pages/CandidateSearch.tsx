import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/candidateCard';

const saveCandidate = (candidate: Candidate) => {
  let parsedSavedCandidate: Candidate[] =[];
  const storedSavedCandidate = localStorage.getItem('candidate');
  if (typeof storedSavedCandidate === 'string') {
    parsedSavedCandidate = JSON.parse(storedSavedCandidate);
  } 
  parsedSavedCandidate.push(candidate); 
  localStorage.setItem('candidate', JSON.stringify(parsedSavedCandidate));
}

const CandidateSearch = () => {
  const [getGithubData, setGithubData] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const data = await searchGithub();
        setGithubData(data);
      } catch (error) {
        console.error("Error fetching data from Github API", error)
      }
    };
    fetchGithubData();
  },[]);  

  useEffect(() => {
    const fetchCandidate = async () => {
      if (getGithubData.length) {
        try {
          const data = await searchGithubUser(getGithubData[index].login);
          setCurrentCandidate(data);
        } catch (error) {
          console.error("Error fetching candidate data", error)
        }
      }
    }
    fetchCandidate();
  }, [index, getGithubData]);
  console.log(currentCandidate);

  useEffect(() => {
    const storedSavedCandidate = localStorage.getItem('candidate');
    if (storedSavedCandidate) {
      const parsedSavedCandidate: Candidate[] = JSON.parse(storedSavedCandidate);
      if (parsedSavedCandidate.length > 0) {
        setCurrentCandidate(parsedSavedCandidate[0]);
      }
    }
  }, []);

  return (
    <>
    <div>
      <h1>Candidate Search</h1>
    </div>
    <div> {currentCandidate &&(
      <section>
        <CandidateCard 
          avatar={currentCandidate.avatar_url}
          name={currentCandidate.name}
          username={currentCandidate.login}
          location={currentCandidate.location}
          email={currentCandidate.email}
          html_url={currentCandidate.html_url}
          company={currentCandidate.company}
          bio={currentCandidate.bio}/>
        <div className='button-container'>
          <button className='button-red' onClick={() => setIndex((prev) => prev + 1)}>
            <span>-</span>
          </button>
          <button className='button-green' onClick={() => {
            if (currentCandidate) {
              saveCandidate(currentCandidate);
              setIndex((prev) => prev + 1);
            }
          } }>
            <span>+</span>
          </button>
        </div>
      </section>
    )}
    </div>   
    </>
  )
};

export default CandidateSearch;
