import { onValue, ref, set } from "firebase/database";
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

    const getData = ()=>{

        const node  = ref(db , 'Users/user1');

        onValue (node , (snapshot)=>{

            console.log (snapshot.val());
        });

    }

    return(
        <div>
            <button className="btn btn-warning" onClick={handleData}> Save Data</button>

            <button className="btn btn-warning" onClick={getData}> Get Data</button>
        </div>
    );


}

export default SaveData;