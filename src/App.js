import React, { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";


const getLocalStorage=()=>{
  let list=localStorage.getItem("list")
  if(list){
    return JSON.parse(list) 
  }
  else{
    return[]
  }
}

function App() {
  const [value, setValue] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [alert, setAlert] = useState({
    showAlert: false,
    alertType: "",
    alertMessage: ""
  })
  const [isEdit, setIsEdit] = useState(false)
  const [itemId, setItemId] = useState(null)
  
  //Control input
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  //From Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!value) { addAlert(true, "danger", "Please Enter Value") } //when the input value is empty triggers  alert
    else if (isEdit === true) //submit value to change selected item data in list if item edit button is onclick
    {
      setList(
        list.map(item => {
          if (item.id === itemId) {
            return { ...item, name: value }
          }
          return item
        })
      )
      addAlert(true, "success", "Value Changed")
      setIsEdit(false)
      setValue("")
    }
    else //submit value to list
    {
      addAlert(true, "success", "Item Added To The List")
      let item = { name: value, id: new Date().getTime() }
      setList([...list, item])
      setValue("")
    }

  }

  const addAlert = (showAlert=false, alertType="", alertMessage="") => {
    setAlert({ showAlert, alertType, alertMessage })
  }
  const removeAlert = () => { setAlert({ ...alert, showAlert: false }) }
  const removeItem = (id) => {
    addAlert(true, "danger", "Item Removed")
    let newList = list.filter(item => item.id !== id)
    setList(newList)
  }
  const editItem = (id, name) => {// get the id of edit Item, set the item name in control input
    setValue(name)
    setIsEdit(true)
    setItemId(id)
  }
  const clearAll = () => {
    addAlert(true, "danger", "Empty List")
    setList([])
  }

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])

  return (
    <div className="section-center" onSubmit={handleSubmit}>
      {alert.showAlert&&<Alert alert={alert} removeAlert={removeAlert} list={list}></Alert>}
      <form className="grocery-form">
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={value}
            onChange={handleChange} />

          <button className="submit-btn">
            {isEdit ? "Edit" : "submit"}
          </button>

        </div>
      </form>

      <List list={list} removeItem={removeItem} editItem={editItem} clearAll={clearAll} ></List>
    </div>
  );
}

export default App;
