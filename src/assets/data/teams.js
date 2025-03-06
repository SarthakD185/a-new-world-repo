

export default function getTeams(collegeID) {

  
    //authenticate from accContext
    const { authenticate } = useContext(AccountContext);
  
    const getTeams = async (e) => {
      e.preventDefault();
      setError('');
  
      //val
      if (!validateInputs()) return;
  
      try {
        //custom auth
        const result = await getTeams(collegeID);
        console.log('Found teams successfully:', result);
  
        //redirect 
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('No teams found.');  
      }
    };
  
}  