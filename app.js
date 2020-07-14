console.warn('Note App');
showNotes();

let addbtn = document.getElementById('addBtn');
addbtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if(addTxt.value.length == 0){
        return alert("Notes description can't be Null");
    }
    myObj = {title:addTitle.value, text:addTxt.value}
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index){
        html += `<div class="noteCard card my-2 mx-4" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick='del(this.id)' href="#" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `<h3 class="text-white">Nothing to Show...Use Add Note Option to add the note</h3>`
    }
}

function del(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('search');
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})