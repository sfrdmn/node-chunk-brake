export PATH := $(shell npm bin):$(PATH)

test:
	tape -v tests/*.js | tap-colorize
