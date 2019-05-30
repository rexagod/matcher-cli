const error = (arg) => process.stderr.write(arg);
const ping = (arg) => process.stdout.write(arg);

exports.pings = {ping: ping, error: error};
