import { buttonStyles } from "../assets"

const Button = ({ customButtonClass, onClick, children }) => {
    return (
        <button className={`button ${customButtonClass}`}
            onClick={onClick}>{children}</button>
    )
}

export default Button