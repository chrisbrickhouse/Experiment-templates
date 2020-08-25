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

var n = 1;
var stimuli_subset = jsPsych.randomization.sampleWithoutReplacement(stimuli, n);

// Get files to preload
const audio = stimuli_subset.map(function (x) { return x["audio"];});
console.log(stimuli);
//var video = [];

var audio_free_response_procedure = {
	timeline: [
		{
			type: 'audio-keyboard-response',
			stimulus: jsPsych.timelineVariable('audio'),
			choices: jsPsych.NO_KEYS,
			trial_ends_after_audio: true
		},
		{
			type: 'survey-text',
			questions: [
				{prompt: "What is the first word that comes to mind?"}
			]
		}
	],
	timeline_variables: stimuli_subset,
	randomize_order: true
};

var timeline = [];

var intro_1 = {
    type: 'html-keyboard-response',
    stimulus: 'Welcome to the experiment. Press any key to begin'
}

timeline.push(intro_1);

var intro_2 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In this experiment, you will be asked to give the first ' +
	"word that comes to mind after hearing a word.</p><p>Do not think too " +
    "hard about your response and try to work quickly.</p>" +
	"<p>Press any key to begin.</p>"
};

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
        '</ol>'
};

var timeline = [];

timeline.push(intro_1);
timeline.push(intro_2);
timeline.push(audio_free_response_procedure);
timeline.push(exit_1);
timeline.push(exit_2);
timeline.push(exit_3);

jsPsych.init({
	timeline: timeline,
	preload_audio: audio,
	on_finish: function() {
		jsPsych.data.displayData();
	}
});
