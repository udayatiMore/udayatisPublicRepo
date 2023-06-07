const axios = require('axios');
//Spawn child processes with server executable for some app 1
const spawnedShell1 = require('child_process').spawn('./some');
//Spawn child processes with server executable for some app 2
const spawnedShell2 = require('child_process').spawn('./some1');
console.log(spawnedShell1.pid);// Prints process id of spawned process with exe 1
console.log(spawnedShell2.pid);// Prints process id of spawned process with exe 2

// To get output from child process' standard output we capture stdout 
spawnedShell1.stdout.on('data', d => console.log(d.toString()));
spawnedShell2.stdout.on('data', d => console.log(d.toString()));
// To get output from child process' server we simply call api exposed by server 
setTimeout(async () => {

    axios.get('http://127.0.0.1:3000/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            const killed = spawnedShell1.kill();
            console.log(killed);
        });

}, 20000)
setTimeout(async () => {
    const url = "";
    axios.get('http://127.0.0.1:3001/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            //Kill process 
            const killed = spawnedShell2.kill();
            console.log(killed);
        });

}, 60000)
// Give input to process
//spawnedShell1.stdin.write('hi');

