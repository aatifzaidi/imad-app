console.log('Loaded!');

//For Changing the text of the Home page Div
var element = document.getElementById("main-text");
element.innerHTML = "I'm still getting Hungrier! Rawwrrrr...";

//Moves the image
var img = document.getElementById("madi");
img.onclick = function(){
    img.style.marginLeft = '100px';
};