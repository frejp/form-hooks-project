import { useState } from "react";

export const useForm = () => {

    const [isFormValid, setIsFormValid] = useState(false);
    let fields = [];

    const validateFields = async () => {
        let fieldsToValidate = fields;
        let fieldsValid = await Promise.all(
            fieldsToValidate.map(field => field.validate())
        );
        let isFormValid = fieldsValid.every(isValid => isValid === true);
        setIsFormValid(isFormValid)
        return isFormValid;
    };

    return {
        onSubmit: async e => {
            console.log('submit');
            e.preventDefault(); // Prevent default form submission
            validateFields();
        },
        addField: field => fields.push(field),
        isFormValid
    };
};
export default useForm;