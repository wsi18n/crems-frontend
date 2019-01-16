import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
    let errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = '必填';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = '必填';
    }

    if (validator.isEmpty(data.first_name)) {
        errors.first_name = '必填';
    }

    if (validator.isEmpty(data.last_name)) {
        errors.last_name = '必填';
    }

    if (validator.isEmpty(data.department_id)) {
        errors.department_id = '必填';
    }

    if (validator.isEmpty(data.ID_number)) {
        errors.ID_number = '必填';
    }

    if (validator.isEmpty(data.mobile)) {
        errors.mobile = '必填';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = '必填';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

export default validateInput;
