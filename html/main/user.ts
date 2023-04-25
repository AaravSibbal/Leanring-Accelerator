/**
 * the way I am thinking is that I can get the userID and 
 * folder ID from the database 
 */

let isInsideAFolder = false

interface Folder {
    name: String;
    definitions: Array<string>
}

let user: {
    loggedIn: boolean,
    userID: string | null,
    folderID: string | null,
    user: string,
    password: string | null,
    currDir: string,
    folderNames: Array<string>,
    folders: Array<Folder>
}

user = {
    loggedIn: false,
    userID: null,
    folderID: null,
    user: "user",
    password: null,
    currDir: "main",
    folderNames: [],
    folders: []
}