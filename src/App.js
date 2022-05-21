import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './components/PasswordItem'
import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    isPasswordHidden: true,
    searchInput: '',
  }

  addNewPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const newPasswordEntry = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswordEntry],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onWebsiteChange = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickingCheckbox = () => {
    this.setState(prevState => ({
      isPasswordHidden: !prevState.isPasswordHidden,
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    }))
  }

  onSearchInputChange = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      passwordsList,
      website,
      username,
      password,
      isPasswordHidden,
      searchInput,
    } = this.state

    const finalList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const listLength = finalList.length === 0
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <form className="card1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
          <div className="add-new-password-container">
            <h1 className="add-password-heading"> Add New Password </h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-img"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="add-password-input-fields"
                value={website}
                onChange={this.onWebsiteChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-img"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="add-password-input-fields"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-img"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="add-password-input-fields"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
            <button
              type="submit"
              className="add-btn"
              onClick={this.addNewPassword}
            >
              Add
            </button>
          </div>
        </form>
        <div className="card2">
          <div className="your-passwords-container">
            <div className="your-password-count-container">
              <h1 className="your-passwords-text"> Your Passwords </h1>
              <p className="passwords-count"> {finalList.length} </p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onSearchInputChange}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="passwords-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.onClickingCheckbox}
              />
              <label htmlFor="checkbox"> Show Passwords </label>
            </div>
            {listLength ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords-text"> No Passwords </p>
              </div>
            ) : (
              <ul className="list-container">
                {finalList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    eachPassword={eachPassword}
                    isPasswordHidden={isPasswordHidden}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default App
