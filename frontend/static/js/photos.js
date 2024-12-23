// 从JSON文件加载照片列表
async function loadPhotos() {
  try {
    const response = await fetch('static/img/memories/photos.json');
    if (!response.ok) {
      console.error('Failed to load photos.json');
      return [];
    }
    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error('Error loading photos:', error);
    // 如果出错，返回一些测试用的图片
    return [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=3'
    ];
  }
}

async function createPhotos() {
  console.log('Creating photos...'); // 添加调试日志
  const photosContainer = document.createElement('div');
  photosContainer.className = 'photos-container';
  document.body.appendChild(photosContainer);

  const photos = await loadPhotos();
  console.log('Loaded photos:', photos); // 添加调试日志
  
  if (photos.length === 0) {
    console.error('No photos found!');
    return;
  }

  photos.forEach((photoSrc, index) => {
    setTimeout(() => {
      console.log('Creating photo:', photoSrc); // 添加调试日志
      const photo = document.createElement('div');
      photo.className = 'floating-photo';
      
      const img = document.createElement('img');
      img.src = photoSrc;
      img.alt = 'Memory Photo';
      
      photo.appendChild(img);
      photosContainer.appendChild(photo);

      const startX = Math.random() * window.innerWidth;
      photo.style.left = `${startX}px`;
      photo.style.animation = `floatUp ${5 + Math.random() * 3}s ease-in forwards`;

      const rotation = -15 + Math.random() * 30;
      photo.style.transform = `rotate(${rotation}deg)`;

      setTimeout(() => {
        photo.remove();
      }, 8000);
    }, index * 300);
  });
}

// 添加相关的CSS样式
const style = document.createElement('style');
style.textContent = `
  .photos-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
  }

  .floating-photo {
    position: absolute;
    bottom: -150px;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    overflow: hidden;
    opacity: 0.9;
    transition: transform 0.3s ease;
  }

  .floating-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(var(--rotation));
      opacity: 0;
    }
  }

  .floating-photo:hover {
    transform: scale(1.1) rotate(0deg) !important;
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  }
`;

document.head.appendChild(style);

// 导出函数供主程序调用
window.createPhotos = createPhotos; 