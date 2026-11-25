var prevWidth = window.innerWidth;
var prevIndex = 0;
function toggleNav() {
  var x = document.getElementById("nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

function grabHTML(text) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(text, 'text/html');
  return doc.body;
}

function selectDisplay(display) {
  if (document.getElementsByClassName("content_Primary")[0].children[0].id == display) {
    return;
  }
  fetch('./pages/' + display + '.html').then(function(response) {
    if (response.ok) {
      console.log(response)
      return response.text();
    }
    throw response
  }).then(function (text) {
    const parent = document.querySelector(".content_Primary");
    let html = grabHTML(text);
    var old = parent.querySelectorAll('div')
    var newContent = html.querySelectorAll('div');
    console.log(old);
    console.log(parent)
    //parent.replaceChildren(...newContent);
    fadeReplace(parent, newContent);
  });
}

function fadeReplace(parent, newContent) {
  var speed = 0.25 * 1000;
  parent.style.opacity = 0;
  setTimeout((function() {
    parent.replaceChildren(...newContent);
    parent.style.opacity = 255;
  }), speed);
}

function sortButtons(index) {
  const nav = document.querySelector(".nav_Global .nav");
  const buttons = nav.querySelectorAll(".uiButton");
  var arrayButtons = Array.from(buttons);
  console.log("INDEX", index)
  prevIndex = index;
  if (window.innerWidth <= 600) {
    swapElements(arrayButtons, 0, index);
    arrayButtons.forEach(el => nav.appendChild(el));
  } else {
    arrayButtons.sort(function (a, b) { 
      a.sortIndex = a.originalIndex;
      b.sortIndex = b.originalIndex;
      return a.originalIndex - b.originalIndex
    }).forEach(el => nav.appendChild(el));
  }
}

function swapElements(list, a, b) {
  console.log(list, a, b)
  var temp = list[b];
  temp.sortIndex = 0;
  list.splice(b, 1);
  list.sort(function (a, b) { 
    a.sortIndex = a.originalIndex;
    b.sortIndex = b.originalIndex;
    return a.originalIndex - b.originalIndex
  })
  list[0].sortIndex = 1;
  list.unshift(temp);
}

window.addEventListener("resize", (event) => {
  if (prevWidth != window.innerWidth) {
    if (prevWidth < window.innerWidth && window.innerWidth > 600) {
      sortButtons(0);
    }

    prevWidth = window.innerWidth;
  }
})