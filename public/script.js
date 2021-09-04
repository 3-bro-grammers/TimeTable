function get_schedule_clk(){
    console.log(1)
    fetch("schedule.json").then(res=>{
        res.json().then(data=>console.log(data))
    })
}