import React, {useState, useEffect} from 'react'

export default function SignUpPage() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = e => {
        e.preventDefault();
        const body = {
            name, _id: username, password
        }
        console.log(body)
    }

  return (
    <div className='container container-fluid'>
        <br />
        <h4>Sign Up Page</h4><br /><br />
        <form onSubmit={submitHandler} className='text-center'>
            <div className='form-group'>
                <label htmlFor="name">Name</label><br /><br />
                <input required={true} type="text" onChange={(e)=>setName(e.target.value)} value={name} name="name" id="name" className='form-group form-control' />
            </div>
            <br /><br />
            <div className='form-group'>
                <label htmlFor="username">Username</label><br /><br />
                <input required={true} type="text" onChange={(e)=>setUsername(e.target.value)} value={username} name="username" id="username" className='form-group form-control' />
            </div>
            <br /><br />
            <div className='form-group'>
                <label htmlFor="password">Password</label><br /><br />
                <input required={true} type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" id="password" className='form-group form-control' />
            </div>
            <br /><br />
            <div>
                <button className='btn btn-lg btn-dark'>Register</button>
            </div>
        </form>
    </div>
  )
}
