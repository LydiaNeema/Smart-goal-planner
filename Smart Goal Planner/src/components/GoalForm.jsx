 function GoalForm(){

     const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    category: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newGoal => {
        onAddGoal(newGoal); 
        setFormData({ name: "", target: "", saved: "", deadline: "", category: "" });
      });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                 <label for="name">Name</label>
                 <br></br>
                <input type="text" name="name" value={formData.name}  onChange={handleChange}placeholder="Enter Name"/>
                <label for="target">Target Amount</label>
                 <br></br>
                <input type="text"  name="target" value={formData.name}  onChange={handleChange} placeholder="Enter Target Amount"/>
                <label for="saved">Saved so far</label>
                 <br></br>
               <input type="text"  name="saved" value={formData.name}   onChange={handleChange} placeholder="Enter Amount to save"/>
                <label for="deadline">Deadline</label>
                 <br></br>
                <input type="text"value={formData.name}  name="deadline"  onChange={handleChange}placeholder="Enter Deadline"/>
                <label for="category">Category</label>
                 <br></br>
                <input type="text"value={formData.name}  name="category" onChange={handleChange} placeholder="Enter Category"/>

            </form>
        </div>
    );
 }
 export default GoalForm;