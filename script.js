const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logologo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')


var answers = 0
var correctAnswers = 0
var wrongAnswers = 0

app.appendChild(logo)
app.appendChild(container)


var request = new XMLHttpRequest;

request.open('GET', 'https://opentdb.com/api.php?amount=10&type=boolean', true)

const scoreBox = document.createElement('div')
scoreBox.setAttribute('class', 'container2')

const scoreCard = document.createElement('h1')
scoreCard.setAttribute('class', 'h1')

const again = document.createElement('div')
again.setAttribute('class', 'container2')
again.setAttribute('onclick', 'goAgain()')

const againBtn = document.createElement('h1')
againBtn.setAttribute('class', 'h1')
againBtn.textContent = "Again?"


scoreBox.appendChild(scoreCard)
app.appendChild(scoreBox)
again.appendChild(againBtn)
app.appendChild(again)

// function seeScore(){
//     const scoreBox = document.createElement('div')
//     scoreBox.setAttribute('class', 'container2')

//     const scoreCard = document.createElement('h1')
//     scoreCard.setAttribute('class', 'h1')
//     scoreCard.textContent = "Correct answers: " + correctAnswers +"/"+answers


//     scoreBox.appendChild(scoreCard)
//     app.appendChild(scoreBox)
// }

function goAgain(){
    location.reload()
}

function updateScore(){
    scoreCard.textContent = "Correct answers: " + correctAnswers +"/"+answers
}

function checkAnswerForTrue(elem){
    console.log('apina')
    const container = elem.parentNode
    const card = elem.parentNode.parentNode
    const ans = elem.parentNode.parentNode.lastChild
    
    if(ans.id == "True"){
        card.style.background = "#b8f9b8"
        container.style.display = "none"
        ans.textContent = "Correct!"
        ans.style.display = "block"
        answers += 1
        correctAnswers += 1
        if(answers >= 1){
            // elem.parentNode.parentNode.parentNode.style.display = "none"
            updateScore()       
        }
    }else {
        card.style.background = "#f986bf"
        container.style.display = "none"
        ans.textContent = "Wrong!"
        ans.style.display = "block"
        answers += 1
        wrongAnswers += 1
        if(answers >= 1){
            // elem.parentNode.parentNode.parentNode.style.display = "none"
            updateScore()       
        }
    }

    
}
function checkAnswerForFalse(elem){
    console.log('apina')
    const container = elem.parentNode
    const card = elem.parentNode.parentNode
    const ans = elem.parentNode.parentNode.lastChild
    
    if(ans.id == "False"){
        card.style.background = "#b8f9b8"
        container.style.display = "none"
        ans.textContent = "Correct!"
        ans.style.display = "block"
        answers += 1
        correctAnswers += 1
        if(answers >= 1){
            // elem.parentNode.parentNode.parentNode.style.display = "none"
            updateScore()   
        }
    }else {
        card.style.background = "#f986bf"
        container.style.display = "none"
        ans.textContent = "Wrong!"
        ans.style.display = "block"
        answers += 1
        wrongAnswers += 1
        if(answers >= 1){
            // elem.parentNode.parentNode.parentNode.style.display = "none"
            updateScore()   
        }
    }

    
    
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

request.onload = function () {
    // Json data
    var data = JSON.parse(this.response)
    console.log(data)
    
    const kysArray = Array.from(data.results);

    if (Array.isArray(kysArray)) {
        kysArray.forEach(item => {
          console.log(item);
        });
      } else {
        console.log('The value is not an array.');
      }

    if(request.status >= 200 && request.status < 400){
        kysArray.forEach((kys) => {
            
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('id', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = decodeHtml(kys.question)

            const buttonContainer = document.createElement('div')
            buttonContainer.setAttribute('class', 'btncntnr')

            const trueButton = document.createElement('button')
            trueButton.textContent = "True"
            trueButton.setAttribute('class', 'button1')
            trueButton.setAttribute('id', 'trueButton')
            trueButton.setAttribute('onclick', 'checkAnswerForTrue(this)')

            const falseButton = document.createElement('button')
            falseButton.textContent = "False"
            falseButton.setAttribute('class', 'button1')
            falseButton.setAttribute('id', 'falseButton')
            falseButton.setAttribute('onclick', 'checkAnswerForFalse(this)')
            
            const scoreButton = document.createElement('button')
            scoreButton.textContent = "See Score"
            scoreButton.setAttribute('class', 'button2')
            scoreButton.setAttribute('onclick', 'seeScore(this)')

           
            
            // const p = document.createElement('p')
            // kys.description = kys.description.substring(0, 300)
            // p.textContent = `${kys.description}...`
            const answer = document.createElement('p')
            answer.textContent = ""
            answer.setAttribute('class', 'answer') 
            answer.setAttribute('id', kys.correct_answer) 
            answer.setAttribute('style', 'display: none;')


            container.appendChild(card)

            card.appendChild(h1)
            card.appendChild(buttonContainer)
            buttonContainer.appendChild(trueButton)
            buttonContainer.appendChild(falseButton)
            card.appendChild(answer)
            // card.appendChild(p)
        })
    }else {
        const errorMessage = document.createElement('marquee')

        errorMessage.textContent = 'not working, bozo'
        app.appendChild(errorMessage)
    }
    
    
}
request.send()

