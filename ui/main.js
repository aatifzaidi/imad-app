console.log('Loaded!');

//For Changing the text of the Home page Div
var element = document.getElementById("main-text");
element.innerHTML = "I'm still getting Hungrier! Rawwrrrr...";

//Moves the image
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft+1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};