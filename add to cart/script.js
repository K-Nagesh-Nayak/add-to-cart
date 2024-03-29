//impoting js from other file

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";




// import { getDatabase,ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// import { getDatabase,ref,push } from "firebase/database";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";



const appSettings = {
    databaseURL: "https://realtime-database-cac1b-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shopingList");
//const booksInDB=ref(database,"books");


//end

const inputFieldEl = document.querySelector("#text");
const addBtn = document.querySelector("#btn");

const shopingList = document.querySelector("#shopping-list")

addBtn.addEventListener("click", function () {

    let item = inputFieldEl.value;
    if (item !== "") {
        push(shoppingListInDB, item)
        // addItemToUl(item)
        clearInputField()
        // console.log(msg)
    } else {
        alert("Enter the item")
    }

})


onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {
        let BokksArray = Object.entries(snapshot.val())

        clearli()
        BokksArray.forEach((e) => {
            let currentItemId = e[0];
            let currentItemName = e[1];


            addItemToUl(currentItemName, currentItemId)
        })
    } else {
        shopingList.innerHTML="No Item here .... yet"
    }


})


// add li item to ul 
function addItemToUl(item, id) {
    // shopingList.innerHTML +=`<li>${item}</li>`
    let newLi = document.createElement("li");
    newLi.textContent = item;
    newLi.id = id;

    newLi.addEventListener("dblclick", (e) => {

        let exactLocationOfId = ref(database, `shopingList/${e.target.id}`)
        remove(exactLocationOfId);
    })

    shopingList.append(newLi);
}

// clear the inputfield 
function clearInputField() {
    inputFieldEl.value = null
}

function clearli() {
    shopingList.innerHTML = ""
}