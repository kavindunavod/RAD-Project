import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(fName, lName, email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFname(e.target.value)} 
        value={fName} 
      />
      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLname(e.target.value)} 
        value={lName} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup