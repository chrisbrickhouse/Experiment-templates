stimuli:
	rm stimuli.json
	touch stimuli.json
	ls audio | sed 's/^/\t{ "audio": "audio\//;1s/^/[\n/;s/$$/" }/;$$!s/$$/,/;$$s/$$/\n]/' >> stimuli.json
