const dropArea = document.getElementById('drop-area')
const custumFileUpload = document.getElementById('id-custum-file-upload')
const dropUl = document.getElementById('id-drop-ul')

dropArea.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  custumFileUpload.style.border = '2px dashed #000000';
});

dropArea.addEventListener('dragleave', (event) => {
  custumFileUpload.style.border = '2px dashed #cacaca';
});

dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  custumFileUpload.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) {
      const child = document.createElement('li')
      const rmIcon = document.createElement('ion-icon')
      const div = document.createElement('div')
      const imageIcon = document.createElement('ion-icon')

      imageIcon.setAttribute('name' , 'image')
      imageIcon.id = 'id-drop-image'

      div.id = 'id-drop-div'

      rmIcon.setAttribute('name' , 'trash')
      rmIcon.id = 'id-drop-trash'

      child.id = 'id-drop-li'
      child.textContent = files[i].path;

      rmIcon.onclick = () => { 
          div.removeChild(imageIcon)
          div.removeChild(child)
          div.removeChild(rmIcon)
          dropUl.removeChild(div)
      }

      div.appendChild(imageIcon)
      div.appendChild(child)
      div.appendChild(rmIcon)
      dropUl.appendChild(div)

  }
});
