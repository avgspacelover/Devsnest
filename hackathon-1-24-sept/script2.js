
//let str= "hi my *name* is , *mukhesh*. **check** my *spotify*"

let str= "hi *wassup*"
let str1= "*is **check** pls * not*i*spotify*"


let str2= "hi my name is , mukhesh. <>**check* my *spotify**"


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

checkString(str1)
