var ActiveDirectory = require('activedirectory');
var config = {
    url: 'ldap://directoryservice.kkk.com',
    baseDN: 'dc=kk,dc=com'
};

var ad = new ActiveDirectory(config);
var username = 'yyy';
var password = 'xxx';

function tryAuth(username, password) {
    return new Promise((res, rej) => {
        ad.authenticate(username, password, (err, auth) => {
            if (err) {
                rej(err);
                return;
            }
            if (auth) {
                res();
            } else {
                rej();
            }
        });
    })
}

function getUser(username) {
    return new Promise((res, rej) => {
        ad.findUser(username, (err, user) => {
            if (err) {
                rej(err);
                return;
            }
            
            if (! user) rej('User: ' + username + ' not found.');
            else res(user);
        });
    })
}

function authUser(username, password) {
    return getUser(username)
        .catch(() => getUser(username.substr(0, username.indexOf("@"))))
        .then(user => {
            return tryAuth(user.userPrincipalName, password)
                .then(() => user)
        })
}


authUser(username, password)
    .then(user => {
        console.log(user);
    })
    .catch(err => {
        console.log(JSON.stringify(err));
    })
