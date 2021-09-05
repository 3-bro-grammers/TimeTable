var staff_select = { w: [], x: [], y: [] };
function get_schedule_clk() {
  
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
  var days = []
  days[0] = [new Date()];
  days[1] = [new Date()];
  days[2] = [new Date()];
  days[1][0].setDate(days[1][0].getDate() + 1);
  days[2][0].setDate(days[2][0].getDate() + 2);
  days[0][1] = `${days[0][0].getDate()}.${days[0][0].getMonth() + 1}.${days[0][0].getFullYear()}`;
  days[1][1] = `${days[1][0].getDate()}.${days[1][0].getMonth() + 1}.${days[1][0].getFullYear()}`;
  days[2][1] = `${days[2][0].getDate()}.${days[2][0].getMonth() + 1}.${days[2][0].getFullYear()}`;

  fetch("schedule.json",{cache: "no-store"})
    .then((res) => res.json())
    .then((data) => {
      // console.table(data);
      var classes=[];

      var innertext = ``;
      
      [days[0],days[1], days[2]].forEach((e,i)=>{
        if(e[0].getDay() == 0){
          classes[i] = ["Sunday", "Sunday"];
        }else{
          classes[i] = [ (!staff_select[data[e[1]][0]][1] || (sel_wireless.value!="x")) ? staff_select[data[e[1]][0]][0] : "Free Now",
                         (staff_select[data[e[1]][1]][1] || (sel_wireless.value!="x"))  ? staff_select[data[e[1]][1]][0] : "Free Now" ];
        }

        innertext += `
        <tr>
          <td>${days[i][1]}</td>
          <td>${classes[i][0]}</td>
          <td>${classes[i][1]}</td>
        </tr> 
        `;

      });
    

      sched_body.innerHTML=innertext;
    });

    document.querySelector('table').style.display="table";

}
window.onload=()=>{
  var res=localStorage.getItem('staff_data');
  if(res)
  {
    staff_select=JSON.parse(res);
    ['sel_optical','sel_wireless','sel_miniproj'].forEach((e,i)=>{
      document.querySelectorAll(`#${e} option`).forEach((e1,i1)=>{
        if((e=='sel_optical' && staff_select[e1.value][0] == "Optical Lab") 
        || (e=='sel_wireless' && staff_select[e1.value][0] == "Wireless Lab")
        || (e=='sel_miniproj' && staff_select[e1.value][0] == "Mini-Project")){
          e1.selected = true;

        }
        else
          e1.selected = false;
      })
    })
    check_optical.checked = staff_select[sel_optical.value][1];
    check_wireless.checked = staff_select[sel_wireless.value][1];
    check_miniproj.checked = staff_select[sel_miniproj.value][1];
  

   
    populate_data();
  }
}
