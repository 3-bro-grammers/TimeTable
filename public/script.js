var staff_select = { w: [], x: [], y: [] };
function get_schedule_clk() {
  document.querySelector('table').style.display="table";
  if (sel_optical.value == sel_wireless.value || sel_miniproj.value == sel_optical.value || sel_miniproj.value == sel_wireless.value) {
    console.log("Invalid Combination");
    return;
  }
  staff_select[sel_optical.value] = ["Optical Lab", check_optical.checked];
  staff_select[sel_wireless.value] = ["Wireless Lab", check_wireless.checked];
  staff_select[sel_miniproj.value] = ["Mini-Project", check_miniproj.checked];
  localStorage.setItem('staff_data',JSON.stringify(staff_select));
  //console.log(staff_select)
  populate_data();
}
function populate_data()
{
  var today = [new Date()];
  var tmrw = [new Date()];
  tmrw[0].setDate(tmrw[0].getDate() + 1);
  today[1] = `${today[0].getDate()}.${today[0].getMonth() + 1}.${today[0].getFullYear()}`;
  tmrw[1] = `${tmrw[0].getDate()}.${tmrw[0].getMonth() + 1}.${tmrw[0].getFullYear()}`;

  fetch("schedule.json",{cache: "no-store"})
    .then((res) => res.json())
    .then((data) => {
      // console.table(data);
      var classes=[];

      
      [today,tmrw].forEach((e,i)=>{
        if(e[0].getDay() == 0){
          classes[i] = ["Sunday", "Sunday"];
        }else{
          classes[i] = [ (!staff_select[data[e[1]][0]][1] || (sel_wireless.value!="x")) ? staff_select[data[e[1]][0]][0] : "Free Now",
                         (staff_select[data[e[1]][1]][1] || (sel_wireless.value!="x"))  ? staff_select[data[e[1]][1]][0] : "Free Now" ];
        }
      });
    

      sched_body.innerHTML=`
      <tr>
        <td>${today[1]}</td>
        <td>${classes[0][0]}</td>
        <td>${classes[0][1]}</td>
      </tr>
      <tr>
      <td>${tmrw[1]}</td>
      <td>${classes[1][0]}</td>
      <td>${classes[1][1]}</td>
      </tr>
      `
    });

}
window.onload=()=>{
  var res=localStorage.getItem('staff_data');
  if(res)
  {
    staff_select=JSON.parse(res);
    ['sel_optical','sel_wireless','sel_miniproj'].forEach((e,i)=>{
      var select = document.getElementById(e);
      for(var i = 0;i < select.options.length;i++){
          if(select.options[i].value == staff_select[e] ){
              select.options[i].selected = true;
          }
      }
    })
   
    populate_data();
  }
}
