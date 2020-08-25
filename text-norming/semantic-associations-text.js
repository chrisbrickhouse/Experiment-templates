// Load stimuli from stimuli.json

var stimuli = (function() {
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

// Instruction slides
var intro_1 = {
    type: 'html-keyboard-response',
    stimulus: 'Welcome to the experiment. Press any key to continue'
}

var intro_2 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In this experiment, you will be asked to give the first ' +
	"word that comes to mind after reading a word.</p><p>Do not think too " +
    "hard about your response and try to work quickly.</p>" +
    "<p>You can use the enter key to submit your responses more quickly.</p>"+
	"<p>Press any key to begin.</p>"
};

// Debrief slides

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

// Procedure

var text_free_response_procedure = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: '+',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},
		{
			type: 'survey-text',
			questions: [
				{
                    prompt: jsPsych.timelineVariable('stimulus'),
                    name: jsPsych.timelineVariable('stimulus'),
                    placeholder: "First word that comes to mind?",
                    required: true
                }
			]
		}
	],
    // Change the following number to set how many words to sample in the experiment
	timeline_variables: jsPsych.randomization.sampleWithoutReplacement(stimuli, 1),
	randomize_order: true
};

// Experiment timeline

var timeline = [];

timeline.push(intro_1);
timeline.push(intro_2);
timeline.push(text_free_response_procedure);
timeline.push(exit_1);
timeline.push(exit_2);
timeline.push(exit_3);

// Start experiment

jsPsych.init({
	timeline: timeline,
    show_progress_bar: true,
	//preload_audio: audio,
	//preload_images: images,
	//preload_video: video,
	on_finish: function() {
		jsPsych.data.displayData();
	}
});
