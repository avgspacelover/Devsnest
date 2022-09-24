const ip = document.querySelector('#input')
const submit = document.querySelector('#submit')
const ipForm = document.querySelector('#input-form')

const displayNotes = document.querySelector('#display-notes')




const noteList = [];

ipForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    let words = ip.value;
    const noteObject = {
        text: "", 
        date: new Date(),
        Author: "Antariksh"
    }

    noteObject.text = words;
    noteList.push(noteObject)
    ip.value=""

    localStorage.setItem("note-list", JSON.stringify(noteList))

    
    console.log("noteObj", noteObject, "noteList", noteList);

    renderList(noteObject);
})

// submit.addEventListener('click', (event)=> {

//     // let words = ip.value;
//     // console.log(words)

// })



//---------------------LIST-RENDER---------------------



const renderList = (obj)=> {

    let savedData = JSON.parse(localStorage.getItem('note-list')) || null
    if(savedData){
        let noteList = savedData;
    }



  //  for(let obj of noteList){
        console.log("obj", obj);
        let div= document.createElement('div');
        let para= document.createElement('p');
        let span1= document.createElement('span');
        let span2= document.createElement('span');
        let textInfoDiv= document.createElement('div');

        let clipboard= document.createElement('button');
        
        
        para.innerText = obj.text;


        let initialtext= obj.text;

        









        span1.innerText = obj.date.getHours() + ":" +obj.date.getMinutes() + " "+ obj.date.toDateString(); 

        span2.innerText = obj.Author

        clipboard.innerText="📋"
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
    
  //  }
}