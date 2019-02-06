const $form = $('#form-login', el);
const $fields = {
    email: $form.find('[name="email"]'),
    password: $form.find('[name="password"]'),
    submit: $form.find('#submit-login')
};

const rules = {
    email: {
        required: true,
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        required: true,
    }
};

const messages = {
    email: {
        required: 'Este campo é obrigatório',
        pattern: 'Favor inserir um e-mail válido',
    },
    password: {
        required: 'Este campo é obrigatório',
    }
};

const validation = {
    pattern(value, pattern) {
        return pattern.test(value);
    },
    required(value, pattern) {
        return pattern ? value !== undefined && value.length > 0 : !pattern;
    }
};

const errors = {
    elementError: (message, className = 'error-message') => `<span class="${className}">${message}</span>`,
    insertErrorMessage: (targetDOM, elementError) => targetDOM.insertHTMLAdjacent('beforeend', elementError()),
};

const submithandler = (e) => {
    e.preventDefault();

    let payload = {
        $fields: {},
        rules: [],
        messages: {},
        isValid: false
    };

    // validate fields
    Object.keys(rules).forEach((name) => {
        const value = $fields[name].val();

        payload.$fields[name] = $fields[name].get(0);

        Object.keys(rules[name]).forEach((rule) => {
            const isValid = validation[rule](value, rules[name][rule]);

            // adicionando mensagens de erro
            if (!isValid) {
                if(name in payload.messages) {
                    payload.messages[name].push(messages[name][rule]);
                } else {
                    payload.messages[name] = [messages[name][rule]];
                }
            }

            // console.log(`${name}/${rule}`, isValid);

            payload.rules.push([ `${name}/${rule}`, isValid ]);
        });
    });

    payload.isValid = payload.rules.every(rule => rule[1]);

    console.log(payload);

    // console.log(payload);

    // if find some error show messages

    // else send data

    // if status 200

    // show sucess message
};
    
}

$form.on('submit', submitHandler);
