import { inputStyles } from "../assets"

const Input = ({ customWrapperClass, customInputClass, customLabelClass, showOutline = true, type = "text" }) => {
    return (
        <div className={`input-wrapper ${customWrapperClass}`}>
            <input className={`input ${customInputClass} ${showOutline && "input__focus__outline"}`}
                id="input"
                type={type}
                placeholder=""
            />
            <label for="input" className={`input__label ${customLabelClass}`}
            >Email address
            </label>
        </div>
    )
}

export default Input