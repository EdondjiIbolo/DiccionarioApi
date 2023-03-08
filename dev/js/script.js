const toggleTheme = document.getElementById('toggle-theme')
const rootStyles = document.documentElement.style
const bodyElement = document.getElementById('body')
const mainElement = document.getElementById('main')
const sectionElement = document.querySelector('.section-info')
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const formElement = document.getElementById('form')
const inputElement = document.querySelector('.input')
const infoElement = document.querySelector('.info')
const selectElemen = document.getElementById('select')
const iconElement = document.getElementById('icon')


const getDefinition = () =>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputElement.value}`)
    .then(response=> response.json())
    .then(data=> {
        let headertitle = sectionElement.firstElementChild;
        let phonetics = data[0].phonetics;
       const getEthiWord = ()=>{
            for(texto of data[0].phonetics){
               
                if (typeof(texto.text) !== 'undefined'){
                  
                  return  texto.text
                }
                
            }
            
        }
        let ethiWord = getEthiWord();
        
        const getAudio = () =>{
            for(texto of data[0].phonetics){
                if (texto.audio.length>1){
                  return  texto.audio
                }
                
            }
            
        }
        let audio = getAudio();
        
        headertitle.innerHTML = `
            <div class="header-info flex" >
                <div class="column-left">
                    <h1 class="header-text">${inputElement.value}</h1>
                    <p class="fonetic-text">${ethiWord}</p>
                </div>
                <div class="column-rigth">
                    <audio src="${audio}"
                     class="audio"></audio>
                    <div class="play">                  
                        <i class="fa-solid fa-play icon icon-blue play-icon"></i>
                    </div>
                </div>
            </div>

            `

        const getInfonoun = () =>{
                if(data[0].meanings[0]){
                console.log(data[0]) 
                
                    let section = document.getElementById('section-2');
                    section.innerHTML = `
                  
                       <div class="group-1">               
                        <p class="title-text">${data[0].meanings[0].partOfSpeech}</p>
                        <p class="description">Meaning</p>
                        <ul id='list' class="list">

                        </ul>
                        <div class="group-2 flex">
                            <p class="description ">Synonyms</p>
                            <div class="syn-container flex">
                            </div>
                        </div>
                  

             
    `
                    
                    
                let listItems = document.getElementById('list')
                let synonymItem = document.querySelector('.syn-container')

                let definitionElement = data[0].meanings[0].definitions;
                let synonymusElement = data[0].meanings[0].synonyms;

                if(data[0].meanings[0].synonyms.length > 3){

                    synonymusElement.splice(2 , synonymusElement.length)

                    for( word of synonymusElement){
                    let listItem = `<p class="synonyms-text">${word}</p>` 

                    synonymItem.innerHTML += listItem 
                    }

                }else{
                    for( word of synonymusElement){
                    let listItem = `<p class="synonyms-text">${word}</p>` 

                    synonymItem.innerHTML += listItem 
                    }

                }

                if(data[0].meanings[0].definitions.length > 4){

                 definitionElement.splice(3 , definitionElement.length)

                    for( word of definitionElement){
                    let listItem = `<li class="description-text">${word.definition}</li>` 

                    listItems.innerHTML += listItem 
                    }

                }else{
                for( word of definitionElement){
                    let listItem = `<li class="description-text">${word.definition}</li>` 

                    listItems.innerHTML += listItem 
                    }
                    console.log(section)


                }
            }else{
//                no es un nombre
                let section = document.getElementById('section-2');
                    section.innerHTML = `
                 <div>
                   

                 </div>
    `
            }
        }

        const getInfoVerb = () =>{
            if(data[0].meanings[1]){
             let section2 = document.getElementById('section-3');
                section2.innerHTML = `
              
                   <div class="group-1">               
                    <p class="title-text">${data[0].meanings[1].partOfSpeech}</p>
                    <p class="description">Meaning</p>
                    <ul id="list-2" class="list">

                    </ul>
                    <div class="group-2 flex">
                        <p class="description ">Synonyms</p>
                        <div class="syn-container  syn-2 flex">

                        </div>
                    </div>
                   </div>
          

           `
                    console.log(section2)
            let listItems2 = document.getElementById('list-2')
            let synonymItem2 = document.querySelector('.syn-2')
            
            
            function Verbdefinition(){
                    
              
            let synonymusElement = data[0].meanings[1].synonyms;
            let definitionElement = data[0].meanings[1].definitions;

            if(data[0].meanings[1].synonyms.length > 3){

                synonymusElement.splice(2 , synonymusElement.length)

                for( word of synonymusElement){
                    let listItem = `<p class="synonyms-text">${word}</p>` 

                    synonymItem2.innerHTML += listItem 
                }

            }
            else{
                for( word of synonymusElement){
                    let listItem = `<p class="synonyms-text">${word}</p>` 

                    synonymItem2.innerHTML += listItem 
                }

            }

            if(data[0].meanings[1].definitions.length > 4){

                definitionElement.splice(3 , definitionElement.length)

                for( info of definitionElement){
                    let listItem = `<li class="description-text">${info.definition}</li>` 

                    listItems2.innerHTML += listItem 

                }

            }
            else{
                for( word of definitionElement){
                    let listItem = `<li class="description-text">${word.definition}</li>` 

                    listItems2.innerHTML += listItem 
                }

                
         }
            }
                Verbdefinition();     
        }
        else { 
             //en caso de que la palabra no sea un verbo
            let section2 = document.getElementById('section-3');
                section2.innerHTML = `
                <div >
                   
                </div>

           `
         }
    }
        

         const getSourceUrl = ()=>{
            console.log(data[0].sourceUrls[0])
             let urlWord = data[0].sourceUrls[0]
             return urlWord
         }
        let sourceUrl = getSourceUrl();
        const sectionUrl = sectionElement.lastElementChild
        sectionUrl.innerHTML = `
            <div >
                <div class="flex">
                <p class="description">Source</p>
                <a href="${sourceUrl}" target="blank_" class=" title-text link-text">${sourceUrl} </a> 
                <i class="fa-solid fa-up-right-from-square link"></i>  

            </div>
            </div>
`
        getEthiWord();
        getInfonoun();
        getInfoVerb();
        getSourceUrl();
        
        if(data[0].meanings.length==1){
            console.log('soso')
            console.log( sectionElement.children[2])
            if(sectionElement.children[2].classList.contains('title-section')){
                sectionElement.children[2].classList.remove('title-section')
            }
           
        }else{
            sectionElement.children[2].classList.add('title-section')
        }
        
        let audioElement = document.querySelector('.play')
        let soundElement = document.querySelector('.audio')
        audioElement.addEventListener('click', ()=>{
              soundElement.play()
        })
     

})
    .catch(  errorFunction =>{
        let errorEement = sectionElement;
        sectionElement.innerHTML = `

            <div  id="section-1">

            </div>
            <div class="title-section" id="section-2">
                <div class="group-1">               
                <p class="title-text">Error</p>
                </div>
                  <p class="title-text">Enter a valid word</p>
            </div>
            
            <div class="title-section" id="section-3">
              
            </div>
            <div class="flex">
                 
            </div>

    `
        console.log(sectionElement)
    })
}

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();
    getDefinition()

})

selectElemen.addEventListener('change',(e)=>{
    let newFont = e.target.value
    console.log(newFont)
    rootStyles.setProperty('--ff-primary',`${newFont}`)
})


toggleTheme.addEventListener('click', (e)=>{
        bodyElement.classList.toggle('dark')
    if(iconElement.classList.contains('fa-sun')){
        iconElement.classList.remove('fa-sun')
        iconElement.classList.add('fa-moon')

       }
    else{
        iconElement.classList.remove('fa-moon')
        iconElement.classList.add('fa-sun')

       }

    if(bodyElement.classList.contains('dark')){

       rootStyles.setProperty('--transform-toggle','translatex(17px)')
       }
    else{
        rootStyles.setProperty('--transform-toggle','translatex(0px)')
       }
    
})