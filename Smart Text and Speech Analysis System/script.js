```javascript
// Get HTML elements

const textInput = document.getElementById("textInput");

const analyzeButton = document.getElementById("analyzeButton");

const clearButton = document.getElementById("clearButton");

const micButton = document.getElementById("micButton");

const voiceStatus = document.getElementById("voiceStatus");

const wordCount = document.getElementById("wordCount");

const charCount = document.getElementById("charCount");

const keywordCount = document.getElementById("keywordCount");

const sentiment = document.getElementById("sentiment");

const sentimentScore = document.getElementById("sentimentScore");

const keywords = document.getElementById("keywords");


// =============================
// ANALYZE TEXT
// =============================

analyzeButton.addEventListener("click", function () {

    const text = textInput.value.trim();

    if (text === "") {

        alert("Please enter some text first.");

        return;
    }


    // Word Count

    const words = text
        .split(/\s+/)
        .filter(word => word.length > 0);

    wordCount.textContent = words.length;


    // Character Count

    charCount.textContent = text.length;


    // Sentiment Analysis

    analyzeSentiment(text);


    // Keyword Detection

    findKeywords(words);

});


// =============================
// SENTIMENT ANALYSIS
// =============================

function analyzeSentiment(text) {

    const positiveWords = [
        "good",
        "great",
        "excellent",
        "amazing",
        "happy",
        "love",
        "wonderful",
        "best",
        "awesome",
        "success",
        "beautiful",
        "nice",
        "fantastic"
    ];


    const negativeWords = [
        "bad",
        "sad",
        "hate",
        "worst",
        "poor",
        "angry",
        "terrible",
        "horrible",
        "problem",
        "failure",
        "boring",
        "disappointed"
    ];


    const lowerText = text.toLowerCase();


    let positiveCount = 0;

    let negativeCount = 0;


    positiveWords.forEach(function (word) {

        if (lowerText.includes(word)) {

            positiveCount++;

        }

    });


    negativeWords.forEach(function (word) {

        if (lowerText.includes(word)) {

            negativeCount++;

        }

    });


    if (positiveCount > negativeCount) {

        sentiment.textContent = "Positive";

        sentimentScore.textContent =
            "Positive words detected: " + positiveCount;

    }

    else if (negativeCount > positiveCount) {

        sentiment.textContent = "Negative";

        sentimentScore.textContent =
            "Negative words detected: " + negativeCount;

    }

    else {

        sentiment.textContent = "Neutral";

        sentimentScore.textContent =
            "No strong sentiment detected";

    }

}


// =============================
// KEYWORD DETECTION
// =============================

function findKeywords(words) {

    const stopWords = [

        "the",
        "is",
        "a",
        "an",
        "and",
        "or",
        "to",
        "of",
        "in",
        "on",
        "for",
        "with",
        "this",
        "that",
        "it",
        "are",
        "was",
        "were",
        "i",
        "you",
        "we",
        "they",
        "he",
        "she",
        "my",
        "your",
        "our",
        "but",
        "as",
        "be",
        "have",
        "has",
        "from"
    ];


    const frequency = {};


    words.forEach(function (word) {

        const cleanWord = word
            .toLowerCase()
            .replace(/[.,!?;:()]/g, "");


        if (
            cleanWord.length > 3 &&
            !stopWords.includes(cleanWord)
        ) {

            if (frequency[cleanWord]) {

                frequency[cleanWord]++;

            } else {

                frequency[cleanWord] = 1;

            }

        }

    });


    const sortedKeywords = Object.entries(frequency)

        .sort(function (a, b) {

            return b[1] - a[1];

        })

        .slice(0, 8);


    keywords.innerHTML = "";


    if (sortedKeywords.length === 0) {

        keywords.innerHTML =
            '<span class="empty-keyword">No keywords detected</span>';

        keywordCount.textContent = "0";

        return;
    }


    keywordCount.textContent = sortedKeywords.length;


    sortedKeywords.forEach(function (item) {

        const keyword = item[0];

        const count = item[1];


        const span = document.createElement("span");

        span.className = "keyword";

        span.textContent =
            keyword + " (" + count + ")";


        keywords.appendChild(span);

    });

}


// =============================
// CLEAR BUTTON
// =============================

clearButton.addEventListener("click", function () {

    textInput.value = "";

    wordCount.textContent = "0";

    charCount.textContent = "0";

    keywordCount.textContent = "0";

    sentiment.textContent = "--";

    sentimentScore.textContent =
        "Waiting for analysis";


    keywords.innerHTML =
        '<span class="empty-keyword">Keywords will appear here</span>';

    voiceStatus.textContent =
        "Microphone is ready";

});


// =============================
// SPEECH RECOGNITION
// =============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    const recognition = new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";


    micButton.addEventListener("click", function () {

        recognition.start();

        micButton.textContent =
            "🔴 Listening...";

        voiceStatus.textContent =
            "Listening to your voice...";

    });


    recognition.onresult = function (event) {

        const speechText =
            event.results[0][0].transcript;


        textInput.value +=
            speechText + " ";


        micButton.textContent =
            "🎙️ Start Speaking";


        voiceStatus.textContent =
            "Speech converted to text successfully.";

    };


    recognition.onend = function () {

        micButton.textContent =
            "🎙️ Start Speaking";

    };


    recognition.onerror = function () {

        micButton.textContent =
            "🎙️ Start Speaking";

        voiceStatus.textContent =
            "Could not access microphone. Please try again.";

    };

}

else {

    micButton.disabled = true;

    micButton.textContent =
        "Speech Not Supported";

    voiceStatus.textContent =
        "Your browser does not support speech recognition.";

}
```
