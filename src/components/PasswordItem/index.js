import './index.css'

const PasswordItem = props => {
  const {eachPassword, isPasswordHidden, deletePassword} = props
  const {website, username, password, id} = eachPassword
  const onClickingDeleteBtn = () => {
    deletePassword(id)
  }
  return (
    <li className="list-item" key={eachPassword.id}>
      <p className="initial"> Y </p>
      <div className="name-password-container">
        <p className="website-name"> {website} </p>
        <p className="username"> {username} </p>
        {isPasswordHidden ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        ) : (
          <p className="password"> {password} </p>
        )}
      </div>
      <button
        type="button"
        testid="delete"
        className="delete-btn"
        onClick={onClickingDeleteBtn}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
