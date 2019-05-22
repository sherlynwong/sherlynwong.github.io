const API_KEY = 'xnmDO2yNs12g0eME2xokLeGYBVqK3TWCJtCF2VmPlsoenZE7A9'
const button_div = document.getElementById('buttons')
const gallery_div = document.querySelector('.gallery')
const score_span = document.getElementById('score')

let score = 0
let words = ['fish', 'house', 'beach', 'ninja', 'cat', 'digimon', 'pokemon']
let correct_answer = ''


function guess(word) {
    if (word == correct_answer) {
        score++
        score_span.innerText = score
        generate()
    } else {
        alert("WRONG!")
    }
}

words.forEach(function (word) {
    let new_button = document.createElement('button')
    new_button.innerText = word
    new_button.classList.add('btn', 'btn-info', 'mx-2')

    new_button.onclick = function () {
        guess(word)
    }

    // new_button.addEventListener('click', function () {
    //     guess(word)
    // })

    button_div.append(new_button)
})

function generate() {
    gallery_div.innerHTML = null
    let random_number = Math.floor((Math.random() * words.length))
    correct_answer = words[random_number]

    fetch(`https://api.tumblr.com/v2/tagged?api_key=${API_KEY}&tag=${correct_answer}&limit=50`)
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            // console.log(result.response)
            result.response.forEach(function (post) {
                if (post.type == 'photo') {
                    const pic = document.createElement('img')
                    pic.src = post.photos[0].original_size.url
                    pic.height = 200
                    gallery_div.appendChild(pic)
                }
            })
        })
}

generate() 