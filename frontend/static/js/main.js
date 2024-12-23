// 示例：发送消息到后端
async function sendMessage(message) {
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 在需要的地方调用
sendMessage('Hello from frontend!').then(response => {
  console.log(response);
});

const showMemories = () => {
  createPhotos();
};

// 在原来调用 balloons() 的地方改为：
showMemories(); 

// 在这里添加触发函数
function init() {
  // 其他初始化代码...
  
  // 在适当的时机触发照片效果
  setTimeout(() => {
    createPhotos();
  }, 5000); // 5秒后触发，你可以调整这个时间
}

// 确保在页面加载完成后执行
document.addEventListener('DOMContentLoaded', init);