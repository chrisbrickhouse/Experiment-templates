// HTML <input> generators
var make_question = function( label, inner_html ) {
    var question = '<div class="demo-question-wrapper">'+
        '<li class="demographic-question">'+label+'</li>'+
        inner_html +
        '</div>';
    return question;
}

var html_input = function( QObj ) {
    if ( QObj.type == 'checkbox' ) {
        var ret = '<div class="form-checkbox-label"><label for="'+QObj.name+'">'  +
            '<input type="checkbox" class="input-checkbox-option" name="'+QObj.name+'" /> ' +
            '<span>'+QObj.label+'</span>'+
            '</label></div>';
    } else if ( QObj.type == 'year' ) {
        var ret = '<div class="form-year-label">' +
            '<input type="text" class="input-year-textbox" name="'+QObj.name+'" pattern="(|[0-9]{4})" placeholder="YYYY" />' +
            '</div>';
    } else if (QObj.type == 'radio' ) {
        var ret = '<div class="form-radio-label"><label for="'+QObj.id+'">' +
            '<input type="radio" name="'+QObj.name+'" id="'+QObj.id+'" value="'+QObj.id+'" />' +
            '<span>'+QObj.label+'</span>' +
            '</label></div>'
    } else if (QObj.type == 'resp-other') {
        var ret = QObj.label+'<input class="resp-other" type="text" name="'+QObj.name+'" />'
    } else if (QObj.type === 'select' ) {
        var ret = '<div class="form-select"><label for="'+QObj.name+'">'+QObj.label+'</label>'+
            '<select name="'+QObj.name+'">';
        ret += '<option value="" selected disabled hidden></option>';
        for ( var i=0; i < QObj.options.length; i++) {
            ret = ret + html_input(QObj.options[i])
        }
        ret = ret + '</select></div>'
    } else if (QObj.type === 'select-option') {
        var ret = '<option value="'+QObj.name+'">'+QObj.label+'</option>'
    } else if (QObj.type === 'textbox') {
        var ret = '<div class="form-textbox-label">' +
        '<input type="text" name="'+QObj.name+
        '" pattern="'+QObj.pattern+
        '" placeholder="'+QObj.placeholder+
        '" /></div>';
    } else if (QObj.type === 'yes-no' ) {
        var ret = html_input({type: 'radio', name: QObj.name, id: QObj.name+'-yes', label: 'Yes' });
        ret += html_input({type: 'radio', name: QObj.name, id: QObj.name+'-no', label: 'No' });
    } else {
        return '<input type="checkbox" class="input-checkbox-option" name="'+name+'" /> ';
    }
    return ret
};

// Build demographic questions
// TODO: add support for shuffling questions and options
var race_options = [
    html_input( { type: 'checkbox', name: 'race_white', label: 'White' } ),
    html_input( { type: 'checkbox', name: 'race_black', label: 'Black or African American' } ),
    html_input( { type: 'checkbox', name: 'race_asian', label: 'Asian' } ),
    html_input( { type: 'checkbox', name: 'race_islander', label: 'Pacific Islander' } ),
    html_input( { type: 'checkbox', name: 'race_latinx', label: 'Hispanic or Latin American' } ),
    html_input( { type: 'checkbox', name: 'race_nl', label: html_input({
        type: 'resp-other',
        name: 'race-nl',
        label: 'Not listed (please specify):'
    })}),
    html_input( { type: 'checkbox', name: 'race_nr', label: 'I prefer to not say' } )
];

var gender_options = [
    html_input( { type: 'radio', name: 'gender', id: 'gender-man', label: 'Man' } ),
    html_input( { type: 'radio', name: 'gender', id: 'gender-woman', label: 'Woman' } ),
    html_input( { type: 'radio', name: 'gender', id: 'gender-nb-nc', label: 'Non-binary or gender non-conforming' }),
    html_input( { 
        type: 'radio', 
        name: 'gender', 
        id: 'gender-unlisted', 
        label: html_input({
            type: 'resp-other',
            name: 'gender-specified',
            label: 'Not listed (please specify):'
        })
    }),
    html_input( { type: 'radio', name: 'gender', value: 'gender-nr', label: 'I prefer to not say' } )
]

var language_options = [
    html_input( { 
        type: 'radio', 
        name: 'lang', 
        id: 'lang-yes', 
        label: html_input({
            type: 'resp-other',
            name: 'other-langs',
            label: 'Yes (please specify):'
        })
    }),
    html_input( {
        type: 'radio',
        name: 'lang',
        id: 'lang-no',
        label: 'No'
    })
];

var education_options = [
    html_input( {
        type: 'select',
        name: 'education',
        label: '',
        options: [
            {
                type: 'select-option',
                name: 'hs-some',
                label: 'Did not graduate high school'
            },
            {
                type: 'select-option',
                name: 'hs-grad',
                label: 'Graduated high school'
            },
            {
                type: 'select-option',
                name: 'ba-some',
                label: 'Some college (less than 2 years)'
            },
            {
                type: 'select-option',
                name: 'assoc-grad',
                label: "Associate's degree (e.g. AA or AS)"
            },
            {
                type: 'select-option',
                name: 'ba-grad',
                label: "Bachelor's degree (e.g. BA or BS)"
            },
            {
                type: 'select-option',
                name: 'ma-grad',
                label: "Master's degree (e.g. MA or MS)"
            },
            {
                type: 'select-option',
                name: 'doctor',
                label: 'Doctorate or professional degree (e.g. PhD, MD, or JD)'
            },
            {
                type: 'select-option',
                name: 'nr',
                label: 'Prefer to not answer'
            }
        ]
    })
]

var income_options = [
    html_input( {
        type: 'select',
        name: 'Anual income',
        label: '',
        options: [
            {
                type: 'select-option',
                name: 'lt-10k',
                label: 'Less than $10,000'
            },
            {
                type: 'select-option',
                name: '10k-50k',
                label: '$10,000 to $50,000'
            },
            {
                type: 'select-option',
                name: '50k-100k',
                label: '$50,000 to $100,000'
            },
            {
                type: 'select-option',
                name: '100k-150k',
                label: '$100,000 to $150,000'
            },
            {
                type: 'select-option',
                name: '150k-300k',
                label: '$150,000 to $300,000'
            },
            {
                type: 'select-option',
                name: '300k-gt',
                label: 'More than $300,000'
            },
            {
                type: 'select-option',
                name: 'nr',
                label: 'Prefer to not answer'
            }
        ]
    })
];
        

var age_question = make_question("In what year were you born?", html_input({type: 'year', name: 'birthyear'}));

var language_question = make_question("Did you speak a language other than English as a child?", language_options.join(''));
    
var gender_question = make_question("What is your gender?", gender_options.join(''));

var race_question = make_question("What is your race or ethnicity?", race_options.join(''));

var education_question = make_question("What is your highest level of schooling?", education_options.join(''));

var income_question = make_question("How much money do you earn in a year?", income_options.join(''));

var zip_question = make_question(
    "What are the first three digits of your postal zip code? "+
    '<div class="tooltip">(Why are we asking this?)<span class="tooltiptext">We would like to know what ' +
    'region you are from, but many towns have the same name. Zip codes avoid that confusion, but all 5 ' +
    'digits would give us too much information about where you live. The first three digits tell us what ' +
    'part of the state you are from without giving us information more specific than a large city. '+
    'You can leave this answer blank if you are not comfortable answering.</span></div>',
    html_input({
        type: 'textbox',
        name: 'location-current',
        pattern: '(|\\d\\d\\d)',
        placeholder: '000'
    }));

var home_state = make_question("What state did you grow up in?", html_input({
        type: 'textbox',
        name: 'location-orig',
        pattern: '(|[A-z]{2})',
        placeholder: 'e.g. NY'
    }));

var own_accent_question = make_question("Do you speak with a southern accent?", html_input({
        type: 'yes-no',
        name: 'own-accent-southern'
}));
var other_accent_question = make_question("Do most of your friends speak with a southern accent?", html_input({
        type: 'yes-no',
        name: 'other-accent-southern'
}));

var politics_question = make_question("What is your political association?", html_input({
    type: 'textbox',
    name: 'politics',
    pattern: '.*',
    placeholder: 'Democrat, Republican, etc'
}));
