import database from 'mysql2';


const db = database.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'corvit_25_08_2025'
});

db.connect(error =>{
    if(error){
        console.log('Connection Error');
    }else{
        console.log('Connection Success');
    }
});

export default db;