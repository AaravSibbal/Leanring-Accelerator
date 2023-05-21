/**\
 * things I have to do
 * 
 * usign userEmail and password get user id
 * 
 */
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the database.db SQlite database.');
  });

module.exports = {
    doesUserExist, 
    doesFolderExist, 
    addDefinition, 
    addFolder, 
    addDefinitionArray, 
    addUser, 
    removeDefinitions,
    removeFolder,
}
function doesUserExist(userEmail){
    sql = `SELECT userEmail FROM user WHERE userEmail = ${userEmail};`
        // first row only
    db.get(sql, (err, row) => {
        if (err) {
            return false
        }
        return row ? true: false

    });
    
}
function addUser (userEmail, password){
    if(!doesUserExist(userEmail)){
        console.log("the user does not exists we re creating the user")
        let sql = `INSERT INTO user(userEmail, password) VALUES(?, ?)`
        
        db.run(sql,  [userEmail,password],(err)=>{
             
            if (err) {
                console.log(err)
                return false;
            }
           
            console.log(`A row has been inserted with userID ${this.lastID}`);
            console.log("we added the user and now we golden")
            return true;
            // get the last insert id
            
        });
    }
    console.log("we found the that user exists or we randomly just wandered here")
    return false

}
function doesFolderExist(userEmail, folderName){
    sql = `SELECT fodlerName FROM folder 
    WHERE userEmail = ${userEmail}
    AND fodlerName = ${folderName};`
    db.run(sql, function(err){
        if(err){
            return err
        }
        else if(row){//if row exists
            return true
        }
        else{
            return false;
        }
        // if len(db_result)==0:
        // print('There is no Student named %s'%name)
        // else:
        //     print('Student %s found with rowids %s'%(name,','.join(map(str, next(zip(*db_result))))))
    } )
}

function addFolder(userEmail, folderName){
    if(this.doesUserExist(userEmail)){
        let sql = `INSERT INTO folder (userEmail, folderName) 
            VALUES (${userEmail}), (${folderName});`
        db.run(sql, function(err) {
            if (err) {
            return false;

            }
            // get the last insert id
            console.log(`A row has been inserted with folderID ${this.lastID}`);
            return true
        });
    }
    return false
    
}

function removeFolder(userEmail, folderName){
    if(this.doesUserExist(userEmail)){
        if(this.doesFolderExist(userEmail, folderName)){
            let sql = `DELETE FROM folders WHERE userEmail = ${userEmail}
            AND folderName = ${folderName};`
            db.run(sql, function(err) {
                if (err) {
                return false;

                }
                // get the last insert id
                console.log(`A row has been deleted with folderID ${this.lastID}`);
                return true
            
            });
        }
        return false
    }
    return false
    
}

function removeDefinitions(userEmail, folderName, definition){
    if(this.doesUserExist(userEmail) && this.doesFolderExist(userEmail, folderName)){
        
        let sql = `DELETE FROM definitions WHERE 
        userEmail = ${userEmail}
        AND folderName = ${folderName}
        AND definition = ${definition};`
        db.run(sql, function(err) {
            if (err) {
            return false;

            }
            // get the last insert id
            console.log(`A row has been deleted with definitionID ${this.lastID}`);
            return true
        
        });
        
    }
    return false
}

function addDefinitionArray(userName, folderName, definitions){
    for(let i=0; i<definitions.length; i++){
        let sql = `INSERT INTO folder (userName, folderName, definitions) 
            VALUES (${userName}, ${folderName}, ${definitions[i]});`
        db.run(sql, function(err) {
            if (err) {
            return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with definitionsID ${this.lastID}`);
        });
    }
    
    
}

function addDefinition(userEmail, folderName, definition){
    let sql = `INSERT INTO definitions (userEmail, folderName, definition) 
            VALUES (${userEmail}), (${folderName}), (${definition});`
    db.run(sql, function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with definitionsID ${this.lastID}`);
      });
}







/**
db.close((err) => {
if (err) {
    return console.error(err.message);
}
console.log('Close the database connection.');
});
 */