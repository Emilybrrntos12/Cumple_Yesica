// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    let currentImage = 1;
    let usedImages = [12]; // Inicialmente ya usamos la imagen 12
    
    // Todas las imágenes disponibles (1-22)
    const allImages = Array.from({length: 22}, (_, i) => i + 1);
    
    // Asignar evento de clic a la primera imagen
    document.getElementById('image1').addEventListener('click', function() {
      popImage(1);
    });
  
    function getRandomUnusedImage() {
      // Filtramos las imágenes no usadas
      const availableImages = allImages.filter(img => !usedImages.includes(img));
      
      if (availableImages.length === 0) {
        return null; // Todas las imágenes han sido usadas
      }
      
      // Seleccionamos una aleatoria
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages[randomIndex];
      
      // La marcamos como usada
      usedImages.push(selectedImage);
      
      return selectedImage;
    }
  
    function popImage(imageNumber) {
      const confettiCount = 50;
      document.getElementById('clickMessage').style.display = 'none';
      
      // Crear confeti
      for (let i = 0; i < confettiCount; i++) {
        createConfetti();
      }
  
      // Ocultar la imagen actual
      document.getElementById('image' + imageNumber).style.display = 'none';
      currentImage++;
  
      if (currentImage <= 22) {
        const nextImageNumber = getRandomUnusedImage();
        
        if (nextImageNumber) {
          const newImageContainer = document.createElement('div');
          newImageContainer.classList.add('image-container');
          newImageContainer.id = 'image' + currentImage;
          
          newImageContainer.innerHTML = `
            <img src="imagenes/Yes${nextImageNumber}.jpeg" alt="Imagen ${currentImage}">
            <div class="number">${currentImage}</div>
          `;
          
          // Asignar evento de clic a la nueva imagen
          newImageContainer.addEventListener('click', function() {
            popImage(currentImage);
          });
          
          document.getElementById('imagesContainer').appendChild(newImageContainer);
        }
      } else {
        // Mostrar mensaje final con animación
        document.getElementById('message').style.display = 'block';
        
        // Redirigir después de 5 segundos (tiempo suficiente para ver el mensaje)
        setTimeout(function() {
          window.location.href = 'Cumple.html';
        }, 5000);
      }
    }
  
    function createConfetti() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => { confetti.remove(); }, 3000);
    }
    
    function getRandomColor() {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    console.log('Aplicación cargada correctamente');
  });