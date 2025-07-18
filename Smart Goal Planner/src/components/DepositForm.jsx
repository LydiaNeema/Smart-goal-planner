function DepositForm(){
    return(
        <div>
            <form>
                 <label for="amount">Amount</label>
                 <br></br>
                <input type="text" placeholder="Enter Amount"/>
                <label for="date">Date</label>
                 <br></br>
                <input type="text" placeholder="Enter Date"/>
                <label for="goal">Goal</label>
                 <br></br>
               <input type="text" placeholder="Enter Amount to save"/>
                

            </form>
        </div>
    );
 }
 export default DepositForm;