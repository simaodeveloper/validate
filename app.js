Validate.createValidation('name', (value, pattern) => {
    return // some validation
});

new Validate({
    rules: {
        "email": {
            required: true,
            pattern: Validate.patterns.email,
        }
    },
    messages: {
        "email": {
            required: 'bla bla',
            pattern: 'bla bla'
        }
    },
    errors: {
        elementName: 'span',
        className: 'error-message',
        errorHandler: (field) => {
            return field;
        },
    }
});
