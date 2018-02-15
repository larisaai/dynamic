$('.parallax-window').parallax({imageSrc: 'img/img_group.jpg'});

/* ---Drawing Logo--- */
var myPaths = document.querySelectorAll('path');
console.log(myPaths);
        
for(let i=0; i < myPaths.length; i++){
            
            var myLength = myPaths[i].getTotalLength();
            myPaths[i].style.strokeDasharray=myLength;
            myPaths[i].style.strokeDashoffset=myLength;
            
            setTimeout(function(){
                console.log(i)
                console.log("hi");
                myPaths[i].classList.add('drawMe'); }, 700*i);
        
};

/*--Typing head title--*/

$('.head_title').typeIt({
     // options
});
