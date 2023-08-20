let db;
let openRequest = indexedDB.open("myDatabase", 2);

// TODO: Open the database
openRequest.addEventListener("success", (e) => {
    console.log("DB Success");
    db = openRequest.result;
})

// TODO: Handle errors while opening the database
openRequest.addEventListener("error", (e) => {
    console.log("DB Error");
})

// TODO: Upgrade the database
openRequest.addEventListener("upgradeneeded", (e) => {
    console.log("DB Upgraded");
    db = openRequest.result;

    //? Create Object Store
    db.createObjectStore("video", { keyPath: "id" });
    db.createObjectStore("image", { keyPath: "id" });
})