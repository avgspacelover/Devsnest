const ip = document.querySelector('#note-input')
const authorIp = document.querySelector('#note-input')

const submit = document.querySelector('#submit')
const ipForm = document.querySelector('#input-form')
const viewDiv= document.querySelector('#view-notes')

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
    
    para.innerHTML = checkString(obj.text);
    //para.contentEditable= "true";
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
const renderViewList = (obj)=> {


    console.log("obj", obj);
    let div= document.createElement('div');
    let para= document.createElement('p');
    let span1= document.createElement('div');
    let span2= document.createElement('div');
    let textInfoDiv= document.createElement('div');

    let clipboard= document.createElement('button');
    
    para.innerHTML = checkString(obj.text);
    //para.contentEditable= "true";
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
    console.log(viewDiv)
    if(viewDiv.hasChildNodes){
        viewDiv.removeChild(viewDiv.firstChild);
    }
    viewDiv.appendChild(div);

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

    if(ip.value.length>0){

        let words = ip.value;
        let authorName= authorIp.value;
        let todayDate= new Date();
        let formattedDate = todayDate.getHours() + ":" +todayDate.getMinutes() + " "+ todayDate.toDateString(); 
        const noteObject = {
            text: "", 
            date: formattedDate,
            Author: authorName.length>0 ? authorName : "Unknown"
        }
    
        noteObject.text = words;
        noteList.push(noteObject)
        ip.value=""
    
        //localStorage.removeItem("note-list")
        localStorage.setItem("note-list", JSON.stringify(noteList))
    
        
        console.log("noteObj", noteObject, "noteList", noteList);
    
        renderList(noteObject);

    }
   
})


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

    console.log("-")
})

noteFwd.addEventListener('click', (e)=> {
    
    console.log("+", displayNotes.children.length, displayNotes)
    
    if(iter!=displayNotes.children.length-1){
        iter++;
        renderViewList(noteList[iter])

    }else if(iter == displayNotes.children.length-1){
        iter=0;
        renderViewList(noteList[iter])

    }
})


function checkString(str){
	let ans= [];
	let i=1, j=1;
	Array.from(str).map((item,idx)=> {
	
			
			if(str[idx]=== "*" && str[idx+1]!=="*" && str[idx-1]!=="*" && i%2==1){

				ans.push("<i>");

				i++;
			}else if(str[idx]=== "*" && str[idx+1]!=="*" && str[idx-1]!=="*" && i%2==0){

				
				ans.push("</i>");
				//idx++;
	
				i++
			}else if(str[idx]=== "*" && str[idx-1]==="*" && j%2==1){
	
				
				ans.push("<b>");


				j++;
			}else if(str[idx]=== "*" && str[idx-1]==="*" && j%2==0){
				ans.push("</b>");


				j++;
			}else if(str[idx]!== "*") {
				console.log(str[idx], idx)
				ans.push(str[idx]);
		
			}
	

		
	
		
	})
	console.log(ans.join(""))
	return ans.join("")
}