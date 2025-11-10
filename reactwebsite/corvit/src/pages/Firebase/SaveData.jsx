import { ref, set } from "firebase/database";
import { db } from "../../Firebase";


function SaveData(){



    const handleData = ()=>{


        const node = ref(db , 'Users/user1');

        set(node , {
            name: "Ali",
            email: "ali@gmail.com",
            age:70,
            gender:"male",
            address:"Lahore , Pakistan"
        })
        .then(alert("data Saved !!"));

    }

    return(
        <div>
            <button className="btn btn-warning" onClick={handleData}> Save Data</button>
        </div>
    );


}

export default SaveData;