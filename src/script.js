// ********* developer word animation ********************
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
 

// ***************** skill animation *****************************
document.addEventListener('DOMContentLoaded', function(event) {
  let circles = document.querySelectorAll('.circle');

  function animateProgress(progress) {
    let degree = 0;
    const targetDegree = parseInt(progress.getAttribute('data-degree'));
    const color = progress.getAttribute('data-color');
    const number = progress.querySelector('.number');
    
    const interval = setInterval(function() {
      degree += 1;
      if (degree > targetDegree) {
        clearInterval(interval);
        return;
      }
      progress.style.background = `conic-gradient(${color} ${degree}%, #fff ${degree}%)`;
    }, 50);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgress(entry.target); 
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.5 });  

  circles.forEach(circle => observer.observe(circle));
});

// ****************** soft skill animation **********************
  const progressBars = document.querySelectorAll('.progress-bar');

  const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const progressBar = entry.target;
         const targetWidth = progressBar.getAttribute('data-width');
         progressBar.style.width = targetWidth;
         observer.unobserve(progressBar);
       }
     });
   }, {
     threshold: 0.5  
   });
   
  progressBars.forEach(bar => observer.observe(bar));
