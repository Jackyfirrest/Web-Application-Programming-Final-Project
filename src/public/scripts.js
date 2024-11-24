// 顯示訊息
function displayMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.classList.add(sender === 'user' ? "user-message" : "bot-message");
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // 滾動到底部
}

// 發送訊息
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // 顯示用戶訊息
    displayMessage(userInput, 'user');
    document.getElementById("user-input").value = ""; // 清空輸入框

    // 聊天機器人回應
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST', // 使用 POST 請求
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput }) // 傳送用戶訊息
    });
    const data = await response.json();
    displayMessage(data.reply, 'bot'); // 顯示機器人回應
}

async function getTarot() {
    try {
        // 發送 GET 請求到後端
        const response = await fetch('http://localhost:3000/api/tarot');
        const data = await response.json();  // 假設返回的是 JSON 格式
        // 顯示塔羅牌訊息
        displayMessage(`你抽到的塔羅牌是：${data.card}`, 'bot');
    } catch (error) {
        console.error('Error fetching tarot card:', error);
        displayMessage('抱歉，無法抽取塔羅牌，請稍後再試。', 'bot');
    }
}

// 生成圖片
async function generateImage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const response = await fetch('http://localhost:3000/api/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: userInput })
    });
    const data = await response.json();

    if (data.image_url) {
        displayMessage(`這是根據你的描述生成的圖片：`, 'bot');
        const img = document.createElement("img");
        img.src = data.image_url;
        img.alt = "Generated Image";
        document.getElementById("chat-box").appendChild(img);
    } else {
        displayMessage("無法生成圖片，請再試一次。", 'bot');
    }
}
