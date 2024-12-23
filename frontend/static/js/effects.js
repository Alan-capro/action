// 樱花飘落效果
function createSakura() {
  const sakura = document.createElement('div');
  sakura.className = 'sakura';
  sakura.style.left = Math.random() * window.innerWidth + 'px';
  sakura.innerHTML = '🌸';
  sakura.style.fontSize = (Math.random() * 20 + 10) + 'px';
  sakura.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
  
  document.body.appendChild(sakura);
  
  setTimeout(() => {
    sakura.remove();
  }, 5000);
}

// 定期创建樱花
setInterval(createSakura, 300);

// 添加页面滚动视差效果
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.parallax');
  elements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(window.pageYOffset * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
}); 