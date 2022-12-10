import './App.css';
import { useEffect, useState } from "react"
import axios from 'axios'



function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItem] = useState([]);
  const [isUpdating, setIsupdating] = useState("");
  const [updateItemtext, setUpadteItemText] = useState("")
  const [number,setNum]=useState("")


  const addItem = async (e) => {
    e.preventDefault();
    try {
     
      const res = await axios.post("https://mern-app-stacks-api/api/item", { item: itemText,numb:number})
      console.log(res);
    }
    catch (err) {
      console.log(err)
    }
  }
  //fetch all data from database 
  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get('http://mern-app-stacks-api/api/items')
        setListItem(res.data);
      } catch (err) {
     console.log(err);
      }
    }
    getItem();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newList = listItems.filter(item => item._id !== id);
      setListItem(newList);
    } catch (err) {
      console.log(err)
    }
  }
  //update ..before that we need to show input field where we will create our update 
  const rederUpdate = () => (
    <form className='update-form' onSubmit={(e)=>uppdateItem(e)}>
      <input type="text" className='update-new-btn' placeholder='New Item' onChange={e => { setUpadteItemText(e.target.value) }} value={updateItemtext}></input>
      <button type='submit' className='update-new-btn '>Update</button>

    </form>
  )
  const uppdateItem =async (e)=>{
    try{
 
      const res=await axios.put(`http://localhost:5500/api/item/${isUpdating}`,{item:updateItemtext})
      e.preventDefault();
      console.log(res.data)
      const updatedItemIndex=listItems.findIndex(item =>item._id===isUpdating);
      const updatedItem=listItems[updatedItemIndex].item=updateItemtext;
    }
    catch(err){
      console.log(err);
    }

  }

  

  return (

    <div className="App">
     
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder="enter your todo item" onChange={e => setItemText(e.target.value)} value={itemText}></input>
        <br></br>
        <br></br>
        <input type="number" placeholder='insert your  number' onChange={e =>setNum(e.target.value)} value={number}></input> 
        <button type="submit"> Add</button>
      </form>

      <div className="todo-listItems">
        {
          listItems.map(item => (
            <div className="todo-item">
              { 
                isUpdating === item._id
                  ? rederUpdate() :
                  <>
                  
                    <p className="item-content">{item.item}</p>
                    <button className="update-item" onClick={() => { setIsupdating(item._id) }}>Update</button>
                    <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                    <input type="text" value={item.numb}></input>
                    
                  
                  </>
              }
            </div>
          )
          )
        }
      </div>
    </div>
  );
}

export default App;
