export const TitleCaseComponent = ({string}) =>{
   //
   var sentence = string !== null && string !== undefined && string.split(" ").length > 1 ? string.split(" ") : false
        var newSentenceArr = []
        if (sentence !== false){
         //
            for(let i = 0; i< sentence.length; i++){
            //
               let newSentence = "";
               sentence[i].trim()
               if(sentence[i] !== "" && isNaN(sentence[i][0])){
                     newSentence = sentence[i].toLowerCase();
                     newSentence = newSentence[0].toUpperCase() +  newSentence.slice(1)
               }else{
                     newSentence = sentence[i] !== "" ? sentence[i][0]  +  sentence[i].slice(1) : ""
               }
                    
               newSentenceArr.push(newSentence)
            }
            return newSentenceArr.join(" ");
        }        
        string  =  string == null || string == undefined ? "N/A" : string[0].toUpperCase(string.toLowerCase()) +  string.slice(1).toLowerCase();
        return string
};

export const getTenorsInBond = d => {
   let months = 0, years = 0, days = 0, weeks = 0;
   while(d){
      if(d >= 365){
         years++;
         d -= 365;
      }else if(d >= 30){
         months++;
         d -= 30;
      }else if(d >= 7){
         weeks++;
         d -= 7;
      }else{
         days++;
         d--;
      }
   };

   return {
      years, months, weeks, days
   };
};