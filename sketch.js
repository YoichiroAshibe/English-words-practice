let wordPairs = [
  { japanese: "りんご", english: "apple", image: "images/apple.png" },
  { japanese: "バナナ", english: "banana", image: "images/banana.png" },
  { japanese: "さくらんぼ", english: "cherry", image: "images/cherry.png" },
  { japanese: "ぶどう", english: "grape", image: "images/grape.png" },
  { japanese: "オレンジ", english: "orange", image: "images/orange.png" }
  // 他のフルーツも同様に追加
];

let currentWord;
let userInput = "";
let score = 0;
let maxRounds = 20; // 20回出題
let currentRound = 0;
let currentImage;

function preload() {
  // 画像の事前読み込み
  for (let i = 0; i < wordPairs.length; i++) {
    wordPairs[i].img = loadImage(wordPairs[i].image);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  resetWord();  // 新しい日本語単語をセット
}

function draw() {
  background(200);

  if (currentRound >= maxRounds) {
    text("練習終了", width / 2, height / 2);
    text("Score: " + score, width / 2, height / 2 + 50);  // 終了時にスコア表示
    return;  // 終了
  }

  // スコアを表示
  text("Score: " + score, width / 2, 100);

  // 現在の日本語単語を表示
  text(currentWord.japanese, width / 2, height / 2 - 50);

  // ユーザーの入力を表示
  text(userInput, width / 2, height / 2);

  // 対応する画像を表示
  if (currentImage) {
    image(currentImage, width / 2 - 100, height / 2 + 50, 200, 200);  // 画像の位置とサイズを調整
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    userInput = userInput.slice(0, -1);  // バックスペースで1文字削除
  } else if (keyCode === ENTER) {
    checkAnswer();  // Enterキーで入力を確認
  } else {
    userInput += key;  // 他のキーを入力
  }
}

function checkAnswer() {
  if (userInput === currentWord.english) {
    score += 10;  // 正解したらスコアを増やす
  }
  currentRound++;  // 1回終了
  if (currentRound < maxRounds) {
    resetWord();  // 次の単語
  }
}

function resetWord() {
  currentWord = random(wordPairs);  // 新しい単語ペアをランダムに選択
  currentImage = currentWord.img;   // 対応する画像を取得
  userInput = "";  // ユーザー入力をリセット
}
