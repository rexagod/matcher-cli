const envVars = require('../.env_vars');

exports.matcherInitQuery =
`live-server ${envVars.MATCHER_PATH}
--port=${envVars.PORT}
--quiet
--no-browser 
&`;
