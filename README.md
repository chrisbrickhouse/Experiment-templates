# Experiment templates
This repository contains example experiments and templates that
anyone may use and redistribute under the [BSD 3-clause license](COPYING).
The experiments are written using the [jsPsych](https://www.jspsych.org) library
and it is included as a submodule of this repository. Hopefully everything works
out of the box, but if you have problems please leave a 
[bug report](https://github.com/chrisbrickhouse/Experiment-templates/issues) or open a pull request.

## Getting started
To get started, clone this repository using:
```
git clone --recursive https://github.com/chrisbrickhouse/Experiment-templates.git
```
**Note:** This repository uses [git submodules](https://www.atlassian.com/git/tutorials/git-submodule), so
you should use the `--recursive` option when cloning.

Navigate to the folder where you cloned the repository, and open one of the experiment folders. Inside you
should see a file `experiment.html`. If you open that in your web browser, the experiment should
run. You can modify the experiment to fit your needs, and each experiment folder has its own README.md file 
which gives information on how to customize the experiment.

## Index of templates
* [audio-norming](audio-norming): participants are played an audio clip, and then asked to respond in a text box.
* [text-norming](text-norming): participants are shown text and asked to respond in a text box.

## Helpful software
These templates were designed to work with [Proliferate](https://github.com/sebschu/proliferate-client) but can be 
modified for use with other experiment distribution workflows.

Some experiments have a [Makefile](https://opensource.com/article/18/8/what-how-makefile) which is used to automate the configuration of that experiment. To use the Makefile configuration, you will need to install [GNU Make](https://www.gnu.org/software/make/) if it is not already on your system.
