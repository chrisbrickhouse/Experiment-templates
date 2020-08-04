// Lists of files to preload

var images = ['img/blue.png','img/orange.png'];
var audio = ['audio/speaker1.ogg','audio/speaker2.ogg','audio/speaker3.ogg'];
//var video = [];

var judgment_trials = {
	type: "image-keyboard-response",
	prompt: "<p>Press a number 1-7 to indicate how unusual the image is.</p>",
	choices: ['1','2','3','4','5','6','7'],
	timeline: [
		{stimulus:'image1.png'},
		{stimulus:'image2.png'},
		{stimulus:'image3.png'}
	]
}

var color_rt_procedure = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: '+',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},
		{
			type: 'image-keyboard-response',
			stimulus: jsPsych.timelineVariable('image'),
			choices: ['F','J','f','j'],
			trial_duration: 2500
		}
	],
	timeline_variables: [
		{ image: 'img/blue.png' },
		{ image: 'img/orange.png' }
	],
	sample: {
		type: 'with-replacement',
		size: 10
	}
};

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
				{prompt: "What three attributes describe the previous speaker?"},
				{prompt: "Where do you think the speaker is from?", placeholder: "City, State/Province, Coutnry"}
			]
		}
	],
	timeline_variables: [
		{ audio: 'audio/speaker1.ogg' },
		{ audio: 'audio/speaker2.ogg' },
		{ audio: 'audio/speaker3.ogg' }
	],
	randomize_order: true,
	repetitions: 2
};

var timeline = [];

var trial_1 = {
    type: 'html-keyboard-response',
    stimulus: 'Welcome to the experiment. Press any key to begin'
}

timeline.push(trial_1);

var trial_2 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In this experiment, a circle will appear in the center ' +
	"of the screen.</p><p>If the circle is <strong>blue</strong>, " +
	"press the letter F on the keyboard as fast as you can.</p>" +
	"<p>If the circle is <strong>orange</strong>, press the letter J " +
	"as fast as you can.</p>" +
	"<div style='width: 700px'>" +
	"<div style'float:left;'><img src='img/blue.png'></img>" +
	"<p class='small'><strong>Press the F key</strong></p></div>" +
	"<div style'float: right;'><img src='img/orange.png'></img>" +
	"<p class='small'><strong>Press the J key</strong></p></div>" +
	"</div>" +
	"<p>Press any key to begin.</p>"
};

timeline.push(trial_2);

var trial_3 = audio_free_response_procedure

timeline.push(trial_3);

jsPsych.init({
	timeline: timeline,
	preload_audio: audio,
	preload_images: images,
	//preload_video: video,
	on_finish: function() {
		jsPsych.data.displayData();
	}
});
