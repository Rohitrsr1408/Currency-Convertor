const  Base_url="https://v6.exchangerate-api.com/v6/288aa6b35e66d3f550501119/latest/"
let selectCountries=document.querySelectorAll('select');
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const icon=document.querySelector('.dropdown i');
    selectCountries.forEach((select)=>{
        for(let currcode in countryList){
        let newOption=document.createElement('option');
        newOption. innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        })
    });


const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newImgSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newImgSrc;
}

btn.addEventListener("click",async (evt)=>{
   evt.preventDefault();
   let amount= document.querySelector(".amount input");
   let amtvalue=amount.value;
   if(amtvalue===""|| amtvalue<1){
    amtvalue=1;
    amount.value="1";
   }

   const URL=`${Base_url}${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data=await response.json();
    // let rate=data['conversion_rates'][toCurr.value];
    let rate=data.conversion_rates[toCurr.value];
    let convertedValue=amtvalue*rate;
    msg.innerText=`${amtvalue}${fromCurr.value}=${convertedValue}${toCurr.value}`;
    
});


icon.addEventListener('click',()=>{
   let temp=toCurr.value;
   toCurr.value=fromCurr.value;
   fromCurr.value=temp;
   updateFlag(toCurr);
   updateFlag(fromCurr);
})
    
    

