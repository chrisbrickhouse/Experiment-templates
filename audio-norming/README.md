# Audio norming
This experiment presents participants with audio followed by a text box asking for the first word that comes to mind. Useful for semantic association tasks and for norming priming stimuli.

## Using:
This experiment uses GNU Make to automate the experiment setup. If you do not want to use GNU Make or want to make more complex changes to the code, the timeline variables can be edited by hand in [stimuli.json](stimuli.json). Advanced users can edit the sed command directly in the [Makefile](Makefile).

### Quickstart

 1. Ensure that you have installed GNU Make
 2. Add your stimuli to the *audio* folder.
 3. Run `make stimuli` in your terminal or command line
 4. Check *stimuli.json* to ensure that your stimuli were properly converted to timeline variables
 5. Open `experiment.html` in your web browser and run the experiment
