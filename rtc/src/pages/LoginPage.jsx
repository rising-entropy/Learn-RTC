import React, {useState, useEffect} from 'react'

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = e => {
        e.preventDefault();
        const body = {
            _id: username, password
        }
        console.log(body)
    }

  return (
    <div className='container container-fluid'>
        <br />
        <h4>Login Page</h4><br /><br />
        <form onSubmit={submitHandler} className='text-center'>
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
                <button className='btn btn-lg btn-dark'>Login</button>
            </div>
        </form>
    </div>
  )
}
