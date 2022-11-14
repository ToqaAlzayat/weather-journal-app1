/* Global Variables */
const server = 'http://localhost:3000';
const url="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=caa343f9823eed9f1bff6ae52b8a1a92&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

function action(){
    const newZip=document.getElementById('zip').value;
    const feel=document.getElementById('feelings').value;
    weatherMood(url,newZip,apiKey)

        .then(function(data){
          //  console.log(data);
            const temp=data['main']['temp'];
           // console.log(temp);
            const finalData={date:newDate,temperature:temp,userResponse:feel};
            postData(server+'/addData',{date:finalData.date,temperature:finalData.temperature,userResponse:finalData.userResponse})
            .then(updateUI(server+'/allData'));
        });
}
// document.getElementById('generate').addEventListener('click',(e)=>{
    
// });
 const weatherMood=async(url,zip,key)=>{
    const response=await fetch(url+zip+key)
    try{
        const data=await response.json();
        return data;
    }catch(error){
        console.log("error",error);
       }
 }
const postData=async(url='',data={})=>{
  //  console.log(data);
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{'Content-Type':'application/json',},
        body:JSON.stringify(data)
    });
    try{
        const newData=await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error",error);
       }
}
const updateUI = async (url='') => {
    /*
    Display user input in the text area 
     */
    const request = await fetch(url);
    try{
        const data = await request.json();
        //console.log(data);
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML= `Feelings: ${data.userResponse}`;
    }catch (error){
        console.log("error", error);
    }
}