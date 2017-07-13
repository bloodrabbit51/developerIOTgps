var cluster = require('cluster');
var cpusCounts = require('os').cpus().lenght;

if(cluster.isMaster){
	for(var i=0;i<cpusCounts;i++){
		cluster.fork();	
	}
} else{
	/*
	* start the express server at multiple ports.
	*/
	
}

cluster.on('exit',function(worker){
	console.log('Worker %d has been died just now :(',worker.id);
	cluster.fork();
});