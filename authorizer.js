'use strict';

const utils = require('api-gateway-policy-gen').utils;
const policyGenerator = require('api-gateway-policy-gen').policyGenerator;

exports.handler = (event, context, callback) => {
    const credentials = getCredentials(event.headers);
    if (credentials == null) {
        console.log('missing credentials');
        return callback('Unauthorized');
    }

    if (authorize(credentials)) {
        const principalId = credentials.username;
        const authInfo = utils.getAuthInfo(event.methodArn);
      
        // allow access to all methods
        const result = policyGenerator.generatePolicy(principalId, authInfo, [{
          allow: true,
          methods: [{
            verb: '*',
            resource: '*'
          }]
        }]);
      
        callback(null, result);
    } else {
        callback('Unauthorized');
    }
};

function getCredentials(headers) {
    try {
        const auth = headers.Authorization;
        const tmp = auth.split(' ');
        const credentials = new Buffer(tmp[1], 'base64').toString().split(':');
        return {
            username: credentials[0],
            password: credentials[1]
        };
    } catch (e) {
        return null;
    }
}

function authorize(credentials) {
    return credentials.username === 'admin' && credentials.password === 'secret';
}