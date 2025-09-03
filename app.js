// 遊戲數據
const gameData = [
    {
        id: 1,
        category: "風景",
        title: "第1題：風景",
        realImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/338bd611-1f5c-472b-903d-e4f7b4f6c75f.png", // 使用AI圖片作為真實圖片（實際應用中會使用真實圖片）
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/338bd611-1f5c-472b-903d-e4f7b4f6c75f.png"
    },
    {
        id: 2,
        category: "動物",
        title: "第2題：動物",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1755517854/pplx_project_search_images/d1fdab997de55ca35e3e15956e14f01e8b28c5f1.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/12e9abd9-ff95-451d-b0b5-18734f6efed7.png"
    },
    {
        id: 3,
        category: "人物",
        title: "第3題：人物",
        realImage: "https://i0.wp.com/kevinneilson.com/wp-content/uploads/2022/06/neilson_portrait_photography_auburn-naturopathic-bw.jpg?resize=750%2C938&ssl=1",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/5458b2a5-9e33-4080-9dbe-45ca96963be5.png"
    },
    {
        id: 4,
        category: "大自然環境",
        title: "第4題：大自然環境",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1756736993/pplx_project_search_images/5d486680fe9fa2bcb6cb5dfca8d7c14c1e238332.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/6969f809-da07-40ed-951c-3c65c0f86e3c.png"
    },
    {
        id: 5,
        category: "城市",
        title: "第5題：城市",
        realImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/30f8e50f-cf7c-4bbe-91fb-4c921758e0cd.png", // 使用AI圖片作為示範
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/30f8e50f-cf7c-4bbe-91fb-4c921758e0cd.png"
    },
    {
        id: 6,
        category: "學校",
        title: "第6題：學校",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1754941109/pplx_project_search_images/6baef6158fb1057b6e0a622b62039d43067d37f2.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a5cb4953-79b9-4ace-83d6-4d20f193c310.png"
    },
    {
        id: 7,
        category: "人臉",
        title: "第7題：人臉",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1756737013/pplx_project_search_images/bdb96cccbf766ea10d9ecd6afc7e8f19702d4518.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/c08efff8-bf35-41d1-80bc-ac569a0c58e8.png"
    },
    {
        id: 8,
        category: "細小事物",
        title: "第8題：細小事物",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1755283554/pplx_project_search_images/f980fae0042e33751cd18765077855ff933636db.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/57f01847-562f-4b75-acb6-6edf1d05a6c7.png"
    },
    {
        id: 9,
        category: "室內環境",
        title: "第9題：室內環境",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1755206599/pplx_project_search_images/002b93556a501db9083759a253ff75835c93e8f6.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/3bb5e764-a7ac-42d4-b62f-ab7366bd6a72.png"
    },
    {
        id: 10,
        category: "家居",    
        title: "第10題：家居",
        realImage: "https://pplx-res.cloudinary.com/image/upload/v1755367712/pplx_project_search_images/1ce73bccf4e199b3b422239bca4205af39ab4741.png",
        aiImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/65587d8d-30cc-4930-a6fe-ce079b28e1ba.png"
    }
];

// 遊戲狀態
let currentQuestion = 0;
let score = 0;
let gameQuestions = [];
let selectedAnswer = null;

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing game...');
    
    // DOM 元素
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const feedbackScreen = document.getElementById('feedback-screen');
    const resultScreen = document.getElementById('result-screen');

    const startGameBtn = document.getElementById('start-game');
    const questionCounter = document.getElementById('question-counter');
    const scoreDisplay = document.getElementById('score-display');
    const questionTitle = document.getElementById('question-title');
    const leftImage = document.getElementById('left-image');
    const rightImage = document.getElementById('right-image');
    const chooseBtns = document.querySelectorAll('.choose-btn');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartGameBtn = document.getElementById('restart-game');

    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackMessage = document.getElementById('feedback-message');
    const currentScoreSpan = document.getElementById('current-score');
    const finalScoreSpan = document.getElementById('final-score');
    const evaluationTitle = document.getElementById('evaluation-title');
    const evaluationText = document.getElementById('evaluation-text');

    // 初始化遊戲
    function initGame() {
        console.log('Initializing game...');
        currentQuestion = 0;
        score = 0;
        selectedAnswer = null;
        gameQuestions = [...gameData];
        updateScore();
    }

    // 開始遊戲
    function startGame() {
        console.log('Starting game...');
        initGame();
        showScreen('game');
        loadQuestion();
    }

    // 載入問題
    function loadQuestion() {
        console.log('Loading question:', currentQuestion + 1);
        
        if (currentQuestion >= gameQuestions.length) {
            showResults();
            return;
        }

        const question = gameQuestions[currentQuestion];
        
        // 更新問題資訊
        questionCounter.textContent = `第${currentQuestion + 1}題 / 共${gameQuestions.length}題`;
        questionTitle.textContent = question.title;
        
        // 隨機決定圖片位置
        const isRealOnLeft = Math.random() > 0.5;
        
        if (isRealOnLeft) {
            leftImage.src = question.realImage;
            rightImage.src = question.aiImage;
            leftImage.dataset.type = 'real';
            rightImage.dataset.type = 'ai';
        } else {
            leftImage.src = question.aiImage;
            rightImage.src = question.realImage;
            leftImage.dataset.type = 'ai';
            rightImage.dataset.type = 'real';
        }
        
        // 重置選擇狀態
        resetSelection();
    }

    // 重置選擇狀態
    function resetSelection() {
        selectedAnswer = null;
        document.querySelectorAll('.image-option').forEach(option => {
            option.classList.remove('selected');
        });
        chooseBtns.forEach(btn => {
            btn.disabled = false;
            btn.textContent = '選擇此圖';
        });
    }

    // 處理圖片選擇
    function handleImageChoice(choice) {
        console.log('Image choice:', choice);
        selectedAnswer = choice;
        
        // 更新視覺狀態
        document.querySelectorAll('.image-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`[data-choice="${choice}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // 禁用所有按鈕
        chooseBtns.forEach(btn => {
            btn.disabled = true;
        });
        
        // 延遲顯示反饋
        setTimeout(() => {
            showFeedback();
        }, 500);
    }

    // 顯示反饋
    function showFeedback() {
        console.log('Showing feedback...');
        const selectedImage = selectedAnswer === 'left' ? leftImage : rightImage;
        const isCorrect = selectedImage.dataset.type === 'real';
        
        if (isCorrect) {
            score += 10;
            feedbackTitle.textContent = '恭喜答對！';
            feedbackTitle.className = 'correct';
            feedbackMessage.textContent = '這確實是真實拍攝的照片。';
        } else {
            feedbackTitle.textContent = '答案錯誤';
            feedbackTitle.className = 'incorrect';
            const correctSide = leftImage.dataset.type === 'real' ? '左邊' : '右邊';
            feedbackMessage.textContent = `${correctSide}是真實照片，另一張是AI生成的。`;
        }
        
        currentScoreSpan.textContent = score;
        updateScore();
        
        showScreen('feedback');
    }

    // 下一題
    function nextQuestion() {
        console.log('Next question...');
        currentQuestion++;
        showScreen('game');
        loadQuestion();
    }

    // 顯示結果
    function showResults() {
        console.log('Showing results...');
        finalScoreSpan.textContent = score;
        
        // 根據分數給予評價
        let evaluation = '';
        if (score >= 90) {
            evaluation = '優秀！您具備出色的圖片辨識能力';
        } else if (score >= 70) {
            evaluation = '不錯！您有一定的辨識能力，但仍需提高警覺';
        } else if (score >= 50) {
            evaluation = '一般。AI生成技術日益精進，需要提高資訊素養';
        } else {
            evaluation = '需要加強。面對網絡圖片時請保持懷疑態度';
        }
        
        evaluationText.textContent = evaluation;
        
        showScreen('result');
    }

    // 重新開始遊戲
    function restartGame() {
        console.log('Restarting game...');
        showScreen('start');
    }

    // 顯示指定畫面
    function showScreen(screenName) {
        console.log('Showing screen:', screenName);
        
        // 隱藏所有畫面
        const screens = [startScreen, gameScreen, feedbackScreen, resultScreen];
        screens.forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
                screen.classList.add('hidden');
            }
        });
        
        // 顯示指定畫面
        let targetScreen;
        switch(screenName) {
            case 'start':
                targetScreen = startScreen;
                break;
            case 'game':
                targetScreen = gameScreen;
                break;
            case 'feedback':
                targetScreen = feedbackScreen;
                break;
            case 'result':
                targetScreen = resultScreen;
                break;
        }
        
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }
    }

    // 更新分數顯示
    function updateScore() {
        if (scoreDisplay) {
            scoreDisplay.textContent = `分數：${score}分`;
        }
    }

    // 事件監聽器
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function(e) {
            console.log('Start game button clicked');
            e.preventDefault();
            startGame();
        });
    }

    chooseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Choose button clicked:', e.target.dataset.choice);
            e.preventDefault();
            if (!e.target.disabled) {
                handleImageChoice(e.target.dataset.choice);
            }
        });
    });

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function(e) {
            console.log('Next question button clicked');
            e.preventDefault();
            nextQuestion();
        });
    }

    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', function(e) {
            console.log('Restart game button clicked');
            e.preventDefault();
            restartGame();
        });
    }

    // 鍵盤快捷鍵
    document.addEventListener('keydown', (e) => {
        const currentScreen = document.querySelector('.screen.active');
        
        if (!currentScreen) return;
        
        if (currentScreen.id === 'game-screen') {
            if (e.key === '1' || e.key === 'ArrowLeft') {
                const leftBtn = document.querySelector('[data-choice="left"]');
                if (leftBtn && !leftBtn.disabled) {
                    handleImageChoice('left');
                }
            } else if (e.key === '2' || e.key === 'ArrowRight') {
                const rightBtn = document.querySelector('[data-choice="right"]');
                if (rightBtn && !rightBtn.disabled) {
                    handleImageChoice('right');
                }
            }
        } else if (currentScreen.id === 'feedback-screen' && e.key === 'Enter') {
            nextQuestion();
        } else if (currentScreen.id === 'start-screen' && e.key === 'Enter') {
            startGame();
        } else if (currentScreen.id === 'result-screen' && e.key === 'Enter') {
            restartGame();
        }
    });

    // 圖片載入錯誤處理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.background = 'var(--color-bg-2)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = '圖片載入失敗';
        });
    });

    console.log('Game initialization complete');
});