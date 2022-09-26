const ip = document.querySelector('#note-input')
const submit = document.querySelector('#submit')
const ipForm = document.querySelector('#input-form')
const viewDiv= document.querySelector('#view-notes-section')

const noteFwd = document.querySelector('#toggle-note-fwd')
const noteBack = document.querySelector('#toggle-note-back')

const displayNotes = document.querySelector('.display-notes')


const renderList = (obj)=> {


    console.log("obj", obj);
    let div= document.createElement('div');
    let para= document.createElement('p');
    let span1= document.createElement('div');
    let span2= document.createElement('div');
    let textInfoDiv= document.createElement('div');

    let clipboard= document.createElement('button');
    
    para.innerText = obj.text;
    para.contentEditable= "true";
    span1.innerText =  `By ${obj.Author}`  
    span2.innerText =  obj.date 

    clipboard.innerText="📋";
    clipboard.addEventListener('click', (e)=> {
        navigator.clipboard.writeText(para.innerText)
    })

    div.id= "note-container"
    textInfoDiv.id="note-info"
    para.id= "note-text"
    span1.id= "date-text"
    span2.id= "author-text"
    clipboard.id= "cc-btn"

    span2.style.fontWeight= "800"
    div.appendChild(para);
    textInfoDiv.appendChild(span1);
    textInfoDiv.appendChild(span2);
    div.appendChild(textInfoDiv);
    div.appendChild(clipboard);
    displayNotes.appendChild(div);

}


let noteList = [];

let savedData = JSON.parse(localStorage.getItem('note-list')) || null
if(savedData){

    noteList= savedData;

    for(let obj of noteList){
        renderList(obj);
    }
    
    renderViewList(noteList[0])
    //localStorage.removeItem("note-list")

}

ipForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    let words = ip.value;
    let todayDate= new Date();
    let formattedDate = todayDate.getHours() + ":" +todayDate.getMinutes() + " "+ todayDate.toDateString(); 
    const noteObject = {
        text: "", 
        date: formattedDate,
        Author: "Antariksh"
    }

    noteObject.text = words;
    noteList.push(noteObject)
    ip.value=""

    //localStorage.removeItem("note-list")
    localStorage.setItem("note-list", JSON.stringify(noteList))

    
    console.log("noteObj", noteObject, "noteList", noteList);

    renderList(noteObject);
})

// submit.addEventListener('click', (event)=> {

//     // let words = ip.value;
//     // console.log(words)

// })



//---------------------view notes---------------------

let iter=0;
console.log("YESSS",typeof displayNotes[iter])


noteBack.addEventListener('click', (e)=> {
    if(iter!=0){
        iter--;
        renderViewList(noteList[iter])
    }else if(iter==0){
        iter= noteList.length-1;
        renderViewList(noteList[iter])
    }
})

noteFwd.addEventListener('click', (e)=> {
    if(iter!=displayNotes.length-1){
        iter++;
        renderViewList(noteList[iter])

    }else if(iter == displayNotes.length-1){
        iter=0;
        renderViewList(noteList[iter])

    }
})



const renderViewList = (obj)=> {


    console.log("obj", obj);
    let div= document.createElement('div');
    let para= document.createElement('p');
    let span1= document.createElement('div');
    let span2= document.createElement('div');
    let textInfoDiv= document.createElement('div');

    let clipboard= document.createElement('button');
    
    para.innerText = obj.text;
    para.contentEditable= "true";
    span1.innerText =  `By ${obj.Author}`  
    span2.innerText =  obj.date 

    clipboard.innerText="📋";
    clipboard.addEventListener('click', (e)=> {
        navigator.clipboard.writeText(para.innerText)
    })

    div.id= "note-container-2"
    textInfoDiv.id="note-info-2"
    para.id= "note-text-2"
    span1.id= "date-text-2"
    span2.id= "author-text-2"
    clipboard.id= "cc-btn-2"

    span2.style.fontWeight= "800"
    div.appendChild(para);
    textInfoDiv.appendChild(span1);
    textInfoDiv.appendChild(span2);
    div.appendChild(textInfoDiv);
    div.appendChild(clipboard);
    viewDiv.removeChild();
    viewDiv.appendChild(div);

}