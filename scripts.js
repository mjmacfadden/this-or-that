// Array of "this or that" questions with unique IDs
const questions = [
    { id: 1, text: "Sunrise or sunset?", image: "placeholder.png" },
    { id: 2, text: "Beach vacation or mountain retreat?", image: "placeholder.png" },
    { id: 3, text: "Cats or dogs?", image: "placeholder.png" },
    { id: 4, text: "Comedy movie or action movie?", image: "placeholder.png" },
    { id: 5, text: "Coffee or tea?", image: "placeholder.png" },
    { id: 6, text: "Books or audiobooks?", image: "placeholder.png" },
    { id: 7, text: "City life or country living?", image: "placeholder.png" },
    { id: 8, text: "Pizza or burgers?", image: "placeholder.png" },
    { id: 9, text: "Texting or calling?", image: "placeholder.png" },
    { id: 10, text: "Winter or summer?", image: "placeholder.png" },
    { id: 11, text: "Superhero powers: flying or invisibility?", image: "placeholder.png" },
    { id: 12, text: "Rock music or pop music?", image: "placeholder.png" },
    { id: 13, text: "Night owl or early bird?", image: "placeholder.png" },
    { id: 14, text: "Netflix binge or a night out?", image: "placeholder.png" },
    { id: 15, text: "Sneakers or sandals?", image: "placeholder.png" },
    { id: 16, text: "Painting or photography?", image: "placeholder.png" },
    { id: 17, text: "Video games or board games?", image: "placeholder.png" },
    { id: 18, text: "Camping in a tent or staying in a cabin?", image: "placeholder.png" },
    { id: 19, text: "Chocolate or vanilla?", image: "placeholder.png" },
    { id: 20, text: "Roller coasters or water slides?", image: "placeholder.png" },
    { id: 21, text: "Morning shower or evening shower?", image: "placeholder.png" },
    { id: 22, text: "Cardio workout or weightlifting?", image: "placeholder.png" },
    { id: 23, text: "Tattoos or piercings?", image: "placeholder.png" },
    { id: 24, text: "Action-packed adventure or relaxing spa day?", image: "placeholder.png" },
    { id: 25, text: "Rainy day or sunny day?", image: "placeholder.png" },
    { id: 26, text: "Hot coffee or iced coffee?", image: "placeholder.png" },
    { id: 27, text: "Mystery novel or romance novel?", image: "placeholder.png" },
    { id: 28, text: "Big party or small gathering?", image: "placeholder.png" },
    { id: 29, text: "Cooking at home or dining out?", image: "placeholder.png" },
    { id: 30, text: "Watching sports or playing sports?", image: "placeholder.png" },
    { id: 31, text: "Camping or hotel stay?", image: "camping-hotel.jpeg" },
    { id: 32, text: "Fancy car or big house?", image: "placeholder.png" },
    { id: 33, text: "Instagram or TikTok?", image: "placeholder.png" },
    { id: 34, text: "Marvel or DC?", image: "placeholder.png" },
    { id: 35, text: "History class or science class?", image: "placeholder.png" },
    { id: 36, text: "Sweet snacks or salty snacks?", image: "placeholder.png" },
    { id: 37, text: "Roller skating or ice skating?", image: "placeholder.png" },
    { id: 38, text: "Podcasts or YouTube videos?", image: "placeholder.png" },
    { id: 39, text: "Paper planner or digital calendar?", image: "placeholder.png" },
    { id: 40, text: "Long road trip or short flight?", image: "placeholder.png" }
];

// Shuffle the questions and save to local storage
let shuffledQuestions = JSON.parse(localStorage.getItem('shuffledQuestions')) || shuffleArray([...questions]);
localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = date.toLocaleDateString('en-US', options);
}

function showNextQuestion() {
    if (shuffledQuestions.length === 0) {
    shuffledQuestions = shuffleArray([...questions]);
    localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
    }

    const nextQuestion = shuffledQuestions.shift();
    localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
    document.getElementById('question').innerText = nextQuestion.text;
    document.getElementById('question-image').src = 'img/' + nextQuestion.image;
    const url = new URL(window.location);
    url.searchParams.set('questionId', nextQuestion.id);
    window.history.pushState({}, '', url);
}

function loadQuestionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = parseInt(urlParams.get('questionId'), 10);
    const question = questions.find(q => q.id === questionId);
    if (question) {
    document.getElementById('question').innerText = question.text;
    document.getElementById('question-image').src = 'img/' + question.image;
    } else {
    showNextQuestion();
    }
}

function shareURL() {
    const url = window.location.href;
    const shareMessage = document.getElementById('share-message');

    // Check if Web Share API is supported and if on mobile
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (navigator.share && isMobile) {
    navigator.share({
        title: 'This or That Question',
        url: url
    }).catch(err => console.error('Error sharing:', err));
    } else {
    // Fallback for desktop: copy URL to clipboard
    navigator.clipboard.writeText(url).then(() => {
        shareMessage.style.display = 'block';
        setTimeout(() => {
        shareMessage.style.display = 'none';
        }, 2000);
    });
    }
}

// Initialize app
document.getElementById('next-btn').addEventListener('click', showNextQuestion);
document.getElementById('share-btn').addEventListener('click', shareURL);
updateDate();
loadQuestionFromURL();