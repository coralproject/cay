// step right up for all things logging

var messageMap = []
export const logOnce = function(key, ...messages) {

	// we've already logged this key, discard
	if (messageMap.indexOf(key) !== -1) {
		return;
	}

	// first time we've seen the key, log and store
	console.log(messages);
	messageMap.push(key);

};
