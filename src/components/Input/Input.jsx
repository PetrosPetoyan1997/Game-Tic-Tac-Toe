
const Input = ({value, onChange}) => {
    return (
        <form>
            <label>
                Name:
                <input type="text" name="name" value={value} onChange={onChange} />
            </label>
        </form>
    );
}

export default Input;