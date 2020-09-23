// Load stimuli from stimuli.json

const stimuli = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "stimuli.json",
    'mimeType': "application/json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();

var n = 5;
var stimuli_subset = jsPsych.randomization.sampleWithoutReplacement(stimuli, n);

// Get files to preload
const audio = stimuli_subset.map(function (x) { return x["audio"];});
console.log(stimuli);
//var video = [];

var audio_free_response_procedure = {
	timeline: [
        {
			type: 'html-keyboard-response',
			stimulus: '+',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},
		{
			type: 'audio-keyboard-response',
			stimulus: jsPsych.timelineVariable('audio'),
			choices: jsPsych.NO_KEYS,
			trial_ends_after_audio: true
		},
		{
			type: 'survey-text',
			questions: [
				{prompt: "What is the first word that comes to mind?", required:true}
			]
		}
	],
	timeline_variables: stimuli_subset,
	randomize_order: true
};

var timeline = [];

// Consent slide 
var consent = {
    type: 'html-button-response',
    stimulus: '<div style="text-align: left; margin-left: 10%; margin-right: 10%">' +
    '<p>We invite you to participate in a research study on language production and comprehension. ' +
    'Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming ' +
    'pictures or describing scenes, making up sentences of your own, or participating in a simple language ' +
    'game.</p>' +
    '<p>There are no risks or benefits of any kind involved in this study.</p>'+
    '<p>You will be paid for your participation at the posted rate.</p>'+
    '<p>If you have read this form and have decided to participate in this experiment, please understand ' +
    'your participation is voluntary and you have the right to withdraw your consent or discontinue ' +
    'participation at any time without penalty or loss of benefits to which you are otherwise entitled. ' +
    'You have the right to refuse to do particular tasks. Your individual privacy will be maintained in ' +
    'all published and written data resulting from the study. You may print this form for your records.</p>' +
    '<h2>CONTACT INFORMATION:</h2>' +
    '<p>If you have any questions, concerns or complaints about this research study, its procedures, risks ' +
    'and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336.</p>' +
    '<p>If you are not satisfied with how this study is being conducted, or if you have any concerns, ' + 'complaints, or general questions about the research or your rights as a participant, please contact ' +
    'the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at ' +
    '(650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford ' +
    'University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.</p>' +
    '<p>If you agree to participate, please proceed to the study tasks.</p>' +
    '</div>',
    choices: ['Agree and continue']
}

var intro_1 = {
    type: 'html-keyboard-response',
    stimulus: 'Welcome to the experiment. Press any key to continue.'
}

var intro_2 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In this experiment, you will be asked to give the first ' +
	"word that comes to mind after hearing a word.</p><p>Do not think too " +
    "hard about your response and try to work quickly.</p>" +
	"<p>Press any key to continue.</p>"
}

var audio_test = {
	timeline: [
        {
			type: 'html-button-response',
			stimulus: 'Before we start, we would like to test your audio. Make sure your speakers are on, then press the button to continue',
			choices: ['Test my speakers']
		},
		{
			type: 'audio-keyboard-response',
			stimulus: jsPsych.timelineVariable('audio'),
			choices: jsPsych.NO_KEYS,
			trial_ends_after_audio: true
		},
		{
			type: 'survey-text',
			questions: [
				{prompt: "What word did you just hear?", required:true}
			]
		}
	],
	timeline_variables: [stimuli_subset[Math.floor(Math.random() * stimuli_subset.length)]]
};

var interlude = {
    type: 'html-button-response',
    stimulus: 'Thanks for testing your speakers! If there are no problems, press the button below to start the experiment.',
    choices: ['Start the experiment']
}

var exit_1 = {
    type: 'html-keyboard-response',
    stimulus: '<p>Thank you for taking our experiment. It helps us a lot!</p><p>We are interested '+
    'in how personal histories affects the way we hear words, so we have a few questions about you '+
    'and your life.</p><p>You are not required to answer these questions if you are not comfortable doing so.</p><p>Press any key to continue</p>'
}

var exit_2 = {
    type: 'survey-html-form',
    preamble: '<p>We would like you to answer answer the following questions.</p>',
    html: '<ol class="input-wrapper">'+
        age_question +
        race_question +
        gender_question +
        zip_question +
        home_state +
        '</ol>'
};

var exit_3 = {
    type: 'survey-html-form',
    preamble: '',
    html: '<ol class="input-wrapper" start="6">'+
        education_question +
        income_question +
        language_question +
        own_accent_question +
        other_accent_question +
        politics_question +
        '</ol>'
};

var timeline = [consent];

timeline.push(intro_1);
timeline.push(intro_2);
timeline.push(audio_test);
timeline.push(audio_free_response_procedure);
timeline.push(exit_1);
timeline.push(exit_2);
timeline.push(exit_3);

jsPsych.init({
	timeline: timeline,
	preload_audio: audio,
	on_finish: function(data) {
		//jsPsych.data.displayData();
        proliferate.submit({"trials": data.values()})
	}
});
