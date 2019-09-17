import React, { useEffect, useState, useRef} from "react";

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
            let formValid = await validateFields();
        },
        addField: field => fields.push(field),
        isFormValid
    };
};
export default useForm;