
   
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        hamburger.addEventListener('click', function() {
           
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
       
        const navItems = document.querySelectorAll('.nav-item');
       
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    });

const input = document.getElementById('imageInput');
const preview = document.getElementById('preview');

input.addEventListener('change', function() {
  preview.innerHTML = ''; // Limpa o preview anterior

  Array.from(this.files).forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        preview.appendChild(img);
      }
      reader.readAsDataURL(file);
    }
  });
});

// Apenas para evitar recarregar a página ao enviar o formulário (não envia realmente para servidor)
document.getElementById('image-upload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Imagens prontas para serem enviadas!');
});

// Salvar imagens selecionadas como ZIP
document.getElementById('save-images').addEventListener('click', function() {
  const files = input.files;
  if (!files.length) {
    alert('Nenhuma imagem selecionada!');
    return;
  }

  const zip = new JSZip();
  const imgFolder = zip.folder("imagens");
  let filePromises = [];

  Array.from(files).forEach(file => {
    const promise = file.arrayBuffer().then(buffer => {
      imgFolder.file(file.name, buffer);
    });
    filePromises.push(promise);
  });

  Promise.all(filePromises).then(() => {
    zip.generateAsync({type: "blob"}).then(function(content) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = "imagens.zip";
      a.click();
    });
  });
});