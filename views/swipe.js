//initialization
let count=0;


$(".left-swipe").click(function(){
    if(count===0){
        count=4;
    }
    var testCount=document.querySelectorAll(".testimonial");
    console.log(testCount.length);
    for(var i=0;i<testCount.length;i++){
     document.querySelectorAll(".testimonial")[i].style.display="none";
    }
     count--;
     console.log(`.test${count}`);
    document.querySelector(`.test${count}`).style.display="block";
    // console.log(`.test${count}`);
});

$(".right-swipe").click(function(){
    if(count===3){
        count=0;
    }
    document.querySelector(".test1").style.display="none";
    document.querySelector(".test2").style.display="none";
    document.querySelector(".test3").style.display="none";
    count++;
    console.log(`.test${count}`);
    document.querySelector(`.test${count}`).style.display="block";
});