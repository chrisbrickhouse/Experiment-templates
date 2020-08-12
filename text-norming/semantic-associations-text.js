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
    stimulus: 'Welcome to the experiment. Press any key to begin'
}

var intro_2 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In this experiment, you will be asked to give the first ' +
	"word that comes to mind after hearing a word.</p><p>Do not think too " +
    "hard about your response and try to work quickly.</p>" +
	"<p>Press any key to begin.</p>"
};

// Debrief slides

var exit_1 = {
    type: 'html-keyboard-response',
    stimulus: '<p>Thank you for taking our experiment.</p><p>Leave blank any question you do not feel comfortable answering.</p><p>Press any key to continue</p>'
}

var exit_2 = {
    type: 'survey-text',
    questions: [
        { name: "age", prompt: 'How old are you?' },
        { name: "location", prompt: 'Where do you live?' },
        { name: "gender", prompt: 'What is your gender?' },
        { name: "race", prompt: 'What is yout race or ethnicity?' },
        { name: "multilingual", prompt: 'Did you speak a language other than English when growing up?' },
        { name: "education", prompt: 'Do you have a high school diploma or equivalent?' }
    ]
};


// Proceedure

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
                    placeholder: "First word that comes to mind?",
                    required: true
                }
			]
		}
	],
	timeline_variables: jsPsych.randomization.sampleWithoutReplacement(stimuli, 200),
	randomize_order: true
};

// Experiment timeline

var timeline = [];

timeline.push(intro_1);
timeline.push(intro_2);
timeline.push(text_free_response_procedure);
timeline.push(exit_1);
timeline.push(exit_2);

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
