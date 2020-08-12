stimuli:
	rm stimuli.json
	touch stimuli.json
	cat wordlist.txt | sed 's/^/\t{ "stimulus": "/;1s/^/[\n/;s/$$/" }/;$$!s/$$/,/;$$s/$$/\n]/' >> stimuli.json
