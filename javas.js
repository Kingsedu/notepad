let notes = JSON.parse(localStorage.getItem("note")) || [];
           
const addButton = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popUpTitle = popupBox.querySelector("header p"),
closeIcon = document.querySelector("header i"),
titleTag = document.querySelector("input"),
descTag = document.querySelector("textarea"),
addBtn = document.querySelector("button");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let isUpdate = false, updateId;

addButton.addEventListener("click", ()=>{
    titleTag.focus();
    popupBox.classList.add("show")
})

closeIcon.addEventListener('click', ()=>{
    titleTag.value=" ";
    descTag.value = " ";
    addBtn.innerText = "Add Note"
    popUpTitle.innerText = "Add a new Note"

    popupBox.classList.remove("show")
});


function showNotes(){
  document.querySelectorAll(".note").forEach(note=> note.remove())
    notes.forEach((note, id)=>{
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick=showMenu(this) class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id},'${note.title}','${note.description}')">Edit</li>
                                    <li onclick=deleteNote(${id})>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

         addButton.insertAdjacentHTML("afterend",  liTag)          
    })
}
showNotes();

function showMenu(selectedTask){
  selectedTask.parentElement.classList.add("show");
  document.addEventListener("click", e =>{
    // removing show class from the settings menu on document click
    if(e.target.tagName != "I" || e.target != selectedTask){
        selectedTask.parentElement.classList.remove("show");
    }
  })
}

function updateNote(deleteId, note, desc){
   isUpdate = true;
   updateId = deleteId
   addButton.click();
   addBtn.innerText = "update Note"
   popUpTitle.innerText = "update a Note"
   titleTag.value = note;
   descTag.value = desc
   console.log(deleteId, note, desc)
}
function deleteNote(deleteId){
    console.log(deleteId);
    notes.splice(deleteId, 1) // removing selected note from array/tasks

    localStorage.setItem("note", JSON.stringify(notes));

   

    showNotes();
}

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let titleText = titleTag.value;
    let descText = descTag.value;
    if(titleText || descText) {
        // getting the month, day, year from the current date
        let dataObj = new Date();
        month = months[dataObj.getMonth()];
        day = dataObj.getDate();
        year = dataObj.getFullYear();

        let noteInfo = {
            title: titleText,
            description: descText,
            date: `${month} ${day} ${year}`
        }
         
        if(!isUpdate){
            notes.push(noteInfo);
        }
        else{
            isUpdate =false;
            notes[updateId] = noteInfo; //updating the noteInfo
        }
            localStorage.setItem("note", JSON.stringify(notes));


            //Clearing the input after adding the notes
            // titleTag.value=" "
            // descTag.value = " "
            closeIcon.click();


            showNotes();
               
    }
    
})
