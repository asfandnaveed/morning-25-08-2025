import database from 'mysql2';



const db = database.createConnection({
    host:process.env.HOST,
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    database: process.env.DBNAME
});

db.connect(error =>{
    if(error){
        console.log('Connection Error : '+error);
    }else{
        console.log('Connection Success');
    }
});

export default db;