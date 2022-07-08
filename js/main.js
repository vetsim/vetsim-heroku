// IIEF(Immediately Invoked Function Expression) function
// It runs as soon as it is defined & avoid global polluting
(() => {
  window.onload = () => {
    let case1JSON = '{"case1" : {"name" : "Bobby","breed" : "Tabby","caseData" : {"timeStamp": [0,167,333,496,675,837,1008,1175,1338,1500,1665,1828,1997,2220],"bloodPressure" : [[130,81,98],[127,82,98],[137,90,106],[122,74,90],[122,74,90],[137,86,102],[119,72,89],[129,89,101],[132,81,99],[126,78,93],[126,78,93],[129,84,99],[130,86,100],[119,94,102]],"heartRate" : [146,123,136, 130, 130, 132,134, 165, 179, 161, 269, 132, 125],"SpO2" : [95, 96, 96, 93, 96, 98, 99, 100, 99, 95, 91, 100, 100],"SpO2HeartRate" : [138, 128,143, 131, 133,138, 140,139, 147, 150, 138, 131, 127],"tempurature" : [36.7, 36.3, 36.3, 36.3, 36.2, 36.2, 36.0, 36.0, 35.7, 35.6,35.5, 35.6,35.5],"respiratoryRate" : [27, 25, 26,30, 32, 27, 32, 32, 38, 40, 40, 35, 40, 48]}}}';
    let case1 = JSON.parse(case1JSON);//case data
    let casePos = 0;//what position in the JSON arrays we are at, based on TimeStamp
    let statElem = [document.getElementById("ecg-number"), document.getElementById("spo2-number"), document.getElementById("temp-number")];//Stat elements for easy access
    let stats = [80, 80 ,80];//Stat normal, what it is supposed to be according to case data
    let totalSeconds = 0;//elapse time for Timer on website
    let totTime = 0;//Total time eleapsed on the sim, in seconds
    
    setInterval(setTime, 1000)
    
    function setTime() {
      iterate(totTime) // Every second we iterate the sim
      totalSeconds += 1;
      document.getElementById("seconds").innerHTML = toString(totalSeconds % 60);
      document.getElementById("minutes").innerHTML = toString(parseInt(totalSeconds / 60));
      totTime += 1;
    }
    
    function toString(value) {
      let valString = value + "";
      return valString.length < 2 ? "0" + valString : valString;
      // ternary operator -- if/else 
    }

    function applyRandom(){//applies a random value to the stat normal to mimic vitals
      let value = 0;
      for (let i = 0; i < 3; i++){
        if(i == 0 || i == 1){
          value = stats[i];//take the normal value
        }else{
          break;//temp is not affected by this ramdom value
        }
        statElem[i].innerHTML = "<b> " + (value + (Math.floor((Math.random() * 7) + 0) - 3)) + " </b>";//add random number to value, between -3 and 3 inclusivly.
      }
    }

    function updateMonitors(){
      for (var i = 0; i < stats.length; i++){
        statElem[i].innerHTML = "<b> " + stats[i] + " </b>";//update all stat elements
      }
    }

    function iterate(time){
      var timeStamp = case1.case1.caseData.timeStamp[casePos];
      if(timeStamp == time){
        //Update stat normal when there is a match
        stats[0] = case1.case1.caseData.heartRate[casePos];
        stats[1] = case1.case1.caseData.SpO2[casePos];
        stats[2] = case1.case1.caseData.tempurature[casePos];

        //Log for testing purposes
        console.log("Match: Time - " + timeStamp + 
        " ; Etc - " + stats[0] +
        " ; SpO2 - " + stats[1] +
        " ; Tempurature - " + stats[2]);
        
        updateMonitors();//Call to update the HTML elements
        casePos += 1;
      }
      applyRandom();
    }

    $("#button-submit-drugs" ).click(function() {
      alert( $('#drop-down-menu-drugs option:selected').text() );
    });

    $("#button-submit-fluids" ).click(function() {
      alert( $('#drop-down-menu-fluids option:selected').text() );
    });
  } //end windows onload
})(); // end IIEF

// ---------------------Not Sure what this part do!!!-------------------------------------------
// let btn = document.querySelector("#btn");
// let sidebar = document.querySelector(".sidebar");
// let searchBtn = document.querySelector(".bx-search");

// btn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(btn.classList.contains("bx-menu")) {
//       btn.classList.replace("bx-menu" , "bx-menu-alt-right");
//   } else {
//       btn.classList.replace("bx-menu-alt-right", "bx-menu");
//   }
// }
// searchBtn.onclick = function() {
//   sidebar.classList.toggle("active")
// }
// ---------------------Not Sure what this part do!!!-------------------------------------------

