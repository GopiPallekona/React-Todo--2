import { useEffect, useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";

function App() {
 const [iscomplete,setIscomplete]=useState(false);
 const [allTodos,setAllTodos]=useState([]);
 const [titleinput,setTitleinput]=useState("");
 const [descriptioninput,setDescriptioninput]=useState("");
 const [completedtodo,setCompletedtodo] = useState([]);


 const handleAddtodo=()=>{
  let newtodoarr={
    title:titleinput,
    description:descriptioninput,
  }
  let updatedtodo=[...allTodos]
  updatedtodo.push(newtodoarr)
  setAllTodos(updatedtodo)
  localStorage.setItem('todolist',JSON.stringify(updatedtodo));
 }

const handleDeletetodo=(index)=>{
  let reducedtodo=[...allTodos]
  reducedtodo.splice(index,1);
  
  localStorage.setItem('todolist',JSON.stringify(reducedtodo))
  setAllTodos(reducedtodo)
}


 const handlecomplete=(index)=>{
   let now=new Date();
   let d=now.getDate();
   
   let mm=now.getMonth() +1;
   let yyyy=now.getFullYear();
   let h=now.getHours();
   let min=now.getMinutes();
   let s=now.getSeconds();

   let completedon= d + '-'+ mm + '-'+ yyyy +  ' At'  +h+':'+min+':'+s ;

   let filteredarr={
     ...allTodos[index],
    completedon:completedon
   }
   let updatedcomplete=[...completedtodo]
    updatedcomplete.push(filteredarr)
     setCompletedtodo(updatedcomplete)
     handleDeletetodo(index)
     localStorage.setItem('completedtodos',JSON.stringify(updatedcomplete));
     
 }


 const handleDeletecompletedtodo=(index)=>{
  let reducedtodo=[...completedtodo]
  reducedtodo.splice(index,1);
  
  localStorage.setItem('completedtodos',JSON.stringify(reducedtodo))
  setCompletedtodo(reducedtodo);
 }



 useEffect(()=>{
  let storedtodos=JSON.parse(localStorage.getItem('todolist'));
 let storedcompletedtodos=JSON.parse(localStorage.getItem('completedtodos'));
  
  if (storedtodos) {
    setAllTodos(storedtodos)
  }

  if (storedcompletedtodos) {
     setCompletedtodo(storedcompletedtodos);
  }
 },[])


  return (
    <div className='App '>
      <h1 >My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">


          <div className='todo-input-item'>
            <label >Title</label>
            <input type="text" placeholder='What do you want to do....*' value={titleinput} onChange={(e)=>setTitleinput(e.target.value)}/>
          </div>


          <div className='todo-input-item'>
            <label >Description</label>
            <input type="text" placeholder='Describe about your task...' value={descriptioninput} onChange={(e)=>setDescriptioninput(e.target.value)}/>
          </div>


          <div className="todo-input-item">
            <button type='button' className='primary-btn' onClick={handleAddtodo}>Add Task</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondary-btn ${iscomplete===false && 'active'}`} onClick={()=> setIscomplete(false)}>Todo</button>
          <button className={`secondary-btn ${iscomplete===true && 'active'}`} onClick={()=> setIscomplete(true)}>Completed</button>
        </div>

          <div className="todo-list">
           {
             iscomplete===false && allTodos.map((item,i)=>{
              return(
                <div className="todo-list-item" key={i}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                </div>
                <div>
                <MdDelete className='delete-icon' onClick={()=>handleDeletetodo(i)}/>
                <MdDone className='done-icon' onClick={()=> handlecomplete(i)}/>
                </div>   
              </div>
              )
            })
           }


{
           iscomplete===true &&   completedtodo.map((item,i)=>{
              return(
                <div className="todo-list-item" key={i}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p> <small>Completed on : </small> {item.completedon}</p>
                </div>
                <div>
                <MdDelete className='delete-icon' onClick={()=>handleDeletecompletedtodo(i)}/>
                {/* <MdDone className='done-icon' onClick={()=> handlecomplete(i)}/> */}
                </div>   
              </div>
              )
            })
           }
          </div>
      </div>
    </div>
  )
}

export default App
