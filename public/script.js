function get_schedule_clk() {
  var url = "schedule.json";
  var today=new Date();
  var tmrw=new Date();
  tmrw.setDate(tmrw.getDate() + 1);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.table(data);
    });
    var today_key = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
    var tmrw_key=`${tmrw.getDate()}.${tmrw.getMonth()+1}.${tmrw.getFullYear()}`;
    var today_res=[],tmrw_res=[];
    if(today.getDay()==0)
    {
        today_res[0]="S";
        tmrw_res="Please check schedule";
    }
    if(!data[tmrw_key])
    tmrw_res="";
}
