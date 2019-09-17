import { useState } from "react";

export const useInput = (form,initialValue, {validations}) => {
    const [value, setValue] = useState(initialValue);
    let [errors, setErrors] = useState([]);

    const validate = async () => {
        let errorMessages = validations.map(validation => validation(value));
        errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
        setErrors(errorMessages);
        return errorMessages.length === 0;
    };

    let field = {
        value,
        setValue,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        },
        validate,
        errors
    };

    form.addField(field);
    return field;
};

export default useInput;