function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.opacity = Math.random() * 0.6 + 0.4;
  snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
  
  const snowflakes = ['❅', '❆', '❄', '✻', '✼', '❋', '❊', '❉'];
  snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
  
  document.body.appendChild(snowflake);

  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}

function startSnow() {
  setInterval(createSnowflake, 300);
}

const snowStyle = document.createElement('style');
snowStyle.textContent = `
  .snowflake {
    position: fixed;
    top: -10px;
    color: #def;
    pointer-events: none;
    user-select: none;
    z-index: 1000;
    animation: snowfall linear forwards;
    text-shadow: 
      0 0 2px #fff,
      0 0 4px #fff,
      0 0 6px #def,
      0 0 8px #def,
      0 0 10px #bcd;
    filter: drop-shadow(0 0 2px rgba(255,255,255,0.8));
  }

  @keyframes snowfall {
    0% {
      transform: translateY(0) rotate(0deg) scale(0.8);
    }
    50% {
      transform: translateY(50vh) rotate(180deg) scale(1);
    }
    100% {
      transform: translateY(100vh) rotate(360deg) scale(0.8);
    }
  }
`;
document.head.appendChild(snowStyle);

// 启动下雪效果
startSnow(); 