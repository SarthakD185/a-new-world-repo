

export default function getColleges() {

  
    const getColleges = async (e) => {
      e.preventDefault();
      setError('');
  
      //val
      if (!validateInputs()) return;
  
      try {
        //custom auth
        const result = await getColleges();
        console.log('Found colleges successfully:', result);
  
        //redirect 
      } catch (err) {
        console.error('Error fetching colleges:', err);
        setError('No teams found.');  
      }
    };
  
}  