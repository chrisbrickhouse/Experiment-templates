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

// Get files to preload
const audio = stimuli.map(function (x) { return x["audio"];});
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
	timeline_variables: stimuli,
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

timeline.push(intro_2);

var trial_3 = audio_free_response_procedure

timeline.push(trial_3);

jsPsych.init({
	timeline: timeline,
	preload_audio: audio,
	on_finish: function() {
		jsPsych.data.displayData();
	}
});
