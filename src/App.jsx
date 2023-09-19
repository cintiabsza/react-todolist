import React, {useState, useEffect} from "react";
import './App.css';
import Icon from './assets/task-list.jpg';


function App(){

const listStorage = localStorage.getItem('List');

    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [newItem, setNewItem] = useState ("");

useEffect ( () =>{
    localStorage.setItem('List', JSON.stringify(list));
}, [list]);

    function includeItem(form){ 
        form.preventDefault(); 
        if(!newItem){
            return;
        } 
        setList([...list, {text: newItem, isCompleted: false}])
        setNewItem("");
        document.getElementById('input-field').focus();
        
    }

    function click(index){ 
        const listaAux = [...list];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setList(listaAux); 
    }

    function del(index){
        const listaAux = [...list];
        listaAux.splice(index,1);
        setList(listaAux);
    }

    function deleteAll() {
        setList([]);
    }

    return (
        <div>
             <h1>To do List</h1>
             <h2>Organize your tasks using To do List App </h2>
             <form onSubmit={includeItem} >
                    
                <input 
                id="input-field"
                type="text" 
                value= {newItem}
                onChange={(e) => {setNewItem(e.target.value)}}
                placeholder="Add new tasks" 
                />
                <button className="add" type="submit">Add</button>
             </form>

            <div className="ListTask">

                    <div style={{textAlign: 'center'}} >
                        {
                        list.length< 1
                        ?
                        <img className="icon" src={Icon} />
                        :
                        list.map((item, index) => (
                            <div 
                            key={index}
                            className={item.isCompleted ? "item complete" : "item"}>

                            <span onClick={() => {click(index)}}>{item.text}</span>
                            <button onClick={() => {del(index)}}   className="del">Delete</button>
                        </div>
                        ))
                         
                        }
                    </div>
                

                {
                    list.length > 0 && 
                    <button onClick={() => {deleteAll()}} 
                    className="deleteAll">Delete All</button>
                }
            </div>

        </div>

    )   
}

export default App


