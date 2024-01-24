const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let buttton = document.querySelector('.button');
let input = document.querySelector('input');

let file;

buttton.onclick =() => {
    input.click();
};

//when browse 
input.addEventListener('change', function(){
    file = this.files[0];
       dragArea.classList.add('active');
    displayFile();
})


//when file is inside the drag area
dragArea.addEventListener('dragover',(event) => {
    event.preventDefault();
    dragText.textContent = 'Release To upload'
    dragArea.classList.add('active');
    // console.log('file is indside the drag area');
});

//when file left the drag area
dragArea.addEventListener('dragleave',() => {
    dragText.textContent = 'Drag and Drop'
    dragArea.classList.remove('active');
    // console.log('file left the drag area');
});

//when the file is dropped in the drag area
dragArea.addEventListener('drop',(event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
    displayFile();
    
});

function displayFile() {
    let fileType = file.type;

    let validExtentions = ['image/jpeg','image/jpg','image/png']

    if(validExtentions.includes(fileType)){
        let fileReader = new FileReader();

        fileReader.onload = () =>{
            let fileURL = fileReader.result;
            // console.log(fileURL);
            let imgTag = `<img src = "${fileURL}" alt="">` ;
            dragArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    }else{
        alert('this file is not an Image');
        dragArea.classList.remove('active');
    }
    // console.log(fileType);
    // console.log('file is dropped in  the drag area');
}