import { useEffect, useState } from "react";
import { listWordsDefault, words } from "../constans/data";


function PuxxleForm(props: any) {

const {search,setWordsPositions,setSearch} = props
const [originIndex, setoriginIndex] = useState([0,0])

const [listWords, setListWords]= useState<any[]>([]);

useEffect(() => {
  
    setListWords(listWordsDefault);


  return () => {
    
  }
}, [])


useEffect(() => {
  
    findWord()


  return () => {
    
  }
}, [search])


const validators =(word:Array<string>, i:number, j:number,type:string, k:number)=>{
 var validate = false;
    switch (type) {
    case 'vTop':
        validate= words[i+1][j]===word[k]
        break;
        case 'vBottom':
            validate= words[i-1][j]===word[k]
            break;
            case 'hLeft':
                validate= words[i][j-1]===word[k]
                break;
                case 'hRigth':
                    validate= words[i][j+1]===word[k]
                    break;
                    case 'dLeft':
                        validate= words[i+1][j-1]===word[k]
                        break;
                        case 'dLeftInv':
                            validate= words[i-1][j+1]===word[k]
                            break;  
                            case 'dRigth':
                                validate= words[i+1][j+1]===word[k]
                                break;
                                case 'dRigthInv':
                                    validate= words[i-1][j-1]===word[k]
                                    break;
    
        default:
            break;

          
    }
    return validate;
}


   
    const validatePostions=(word:Array<string>, i:number, j:number,type:string)=>{

     
        var position: { x: number; y: number; }[] =[]
        for(let k=1; k<word.length; k++){
           
            
            if(validators(word,i,j,type,k)){
                if(k==1){
                    position.push({x:i,y:j})
                    console.log({x:i,y:j},words[i][j])
                }
              
          
                switch (type) {
                    case 'vTop': 
                        i+=1 
                        break;
                        case 'vBottom':
                            i-=1;
                            break;
                            case 'hRigth':
                                j+=1
                                break
                                case 'hLeft':
                                    j-=1
                                    break
                                    case 'dLeft':
                                        i+=1 
                                        j-=1 
                                        break;
                                        case 'dLeftInv':
                                            i-=1 
                                            j+=1 
                                            break;  
                                            case 'dRigth':
                                                i+=1 
                                                j+=1 
                                                break;
                                                case 'dRigthInv':
                                                    i-=1 
                                                    j-=1 
                                                    break;
                
                        default:
                            break;
                
                          
                    }
                 
                  position.push({x:i,y:j})
               
                  if(position.length===word.length){
                   
                    i=words.length-1
                    j=words[i].length-1
                   
             
                    
                    setWordsPositions([{name:search.toUpperCase(), positions:position}])
                  
                  
                  }
               
            }else{
                if(k===word.length-1){

                    if(type==='dRigth' || type==='dLeft' || type==='dRigthInv' || type==='dLeftInv'){
                       
                        j=originIndex[1];
                    }
                    i=originIndex[0];
                }
                k=word.length-1
                if(position.length>1){

                    if(type==='hTop' || type==='hButtom' ){
                        j=position[0].y
                    }else if(type==='hRigth' || type==='hLeft'){
                        i=position[0].x
                    }else{
                        j=position[0].y
                        i=position[0].x
                    }
                        
                    
                  
                }
                
                
               
            }
        }
    }
    
   const findWord=()=> {


    var word = search.toUpperCase().split('')
   

    for(let i=0; i<words.length; i++){
       for(let j=0; j<words[i].length; j++){

        
            if(words[i][j]===word[0]){
                
                setoriginIndex([i,j]); 

                if(words[i+1] && words[i+1][j]){
                   validatePostions(word,i,j,"vTop");
                }
              
                if(words[i-1] && words[i-1][j]){

                    validatePostions(word,i,j,"vBottom");
                }

                 if(words[i][j+1]){
                    validatePostions(word,i,j,"hRigth");
                    
                }
                if(words[i][j-1]){

                    validatePostions(word,i,j,"hLeft");
                
                }
                if( words[i+1] && words[i+1][j-1]){
                    validatePostions(word,i,j,"dLeft");
                  
                }
                if( words[i-1] && words[i-1][j+1]){
                    validatePostions(word,i,j,"dLeftInv");
                }
                if( words[i+1] && words[i+1][j+1]){
                    validatePostions(word,i,j,"dRigth");
                  
                }
                if( words[i-1] && words[i-1][j-1]){
                    validatePostions(word,i,j,"dRigthInv");
                }
               
            }

        }
    }
  

   
   }
    function handleClick(e:any) {

        e.preventDefault();
    
        setSearch(e.currentTarget.innerHTML);
    
    
       
    
    }
    return (       
    <section>
        <form>
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Buscar
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3
            text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="search" type="text" placeholder="" 
            onChange={(e)=>{
                setSearch(e.target.value)
                }}
             onBlur={(e)=>{
                if(listWords.find(w=>w !==e.target.value && e.target.value!=='')){
                    setListWords([...listWords, e.target.value.toUpperCase()]);
                }
                
             }}   
                />
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
            focus:outline-none focus:shadow-outline" type="button" onClick={findWord}>
            Search Word
           </button>
            
           <div className="flex flex-wrap p-6">
              {listWords.map((w,i)=>{
                return <button className="w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline" onClick={(e)=>handleClick(e)} key={i}>
                        {w}
                        </button>

              })}

                
            </div>
                            
        </form>
   
      </section> );
}

export default PuxxleForm;