import { useState } from "react";
import PuzzleForm from "../components/puzzleForm";
import { words } from "../constans/data";



function Puzzle() {


   const [search, setSearch] = useState('');
   const [wordsPositions, setWordsPositions] = useState<any[]>([])
   
   const fillPuzzle=(name:string, x:number, y:number)=>{

    if(wordsPositions.filter((w:any)=> w.name === name)[0]){
    
    
            return wordsPositions.filter((w:any)=> w.name === name)[0]
        .positions.some((p:any)=>p.x===x && p.y===y)
 
    }
      return false;
   }

    return ( 
    <div className="container p-3 flex">
    
    
    <PuzzleForm search={search} setSearch={setSearch} setWordsPositions={setWordsPositions}></PuzzleForm>

        <section className="flex flex-col w-2/4 p-3">
       
            {words.map((rows:Array<string>, i)=>{
                
            return <div className="flex" key={i}>
               {rows.map((word,j)=>{

                return( 
                    <div className={`text-center p-3  border-2 w-1/5 
                   
                    ${fillPuzzle(search.toUpperCase(),i,j)?'bg-cyan-200':'bg-transparent'}`
                    
                    } key={i+j}>

                    <p className="text-3">{word}</p>
                    <p className="text-3">{i}{j}</p>
                   
                </div>
                   
                );
            })}
           </div> 
            })}
        </section>
        <section className="w-2/4 p-3">
        <h1 className=""></h1>
           {
            
           
            wordsPositions.map((w:any,i:any)=>{
                return <div className="" key={i}>{w.name}
                
                        <ul>
                            {w.positions && w.positions.map((p:any)=>{
                                return <li>
                                    <strong className="felx-1">[{p.x},{p.y}]</strong>
                                </li>
                            })}
                            
                        </ul>
                </div>
              
            })
           
           
           }
        </section>
    </div> );
}

export default Puzzle;