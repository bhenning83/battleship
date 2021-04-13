import {React, useState} from 'react'

function NameBox(props) {
  const {player, id} = props
  const [title, setTitle] = useState('')
  const [changeable, setChangeable] = useState(true)

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    document.getElementById(id).style.display='none';
    document.querySelector(`#${id} + h3`).style.display='block';
    player.setTitle(title)
  }

  return(
    <div>
      <form onSubmit={handleSubmit} id={id}>
        <input onChange={handleChange} 
        type="text"
        value={title}
        placeholder='Enter Your Name'></input>
      </form>
      <h3 style={{display: 'none'}}>{title}</h3>
    </div>
  )
}

export default NameBox