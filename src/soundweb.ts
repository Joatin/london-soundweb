import {Socket} from 'net';

export class Soundweb {
  public static get area(): string { return '192.168' }
  public static get port(): string { return '1023' }

  constructor(socket?: any){

  }

  connect(){

  }

  getNodes(){

  }

  private scan(){
    for(var j=1; j <=255; j++){
      for(var i=1; i <=255; i++){
        this.checkPort(Soundweb.port, Soundweb.area+'.'+j+'.'+i, function(error, status, host, port){
          if(status == "open"){
            console.log("Reader found: ", host, port, status);
          }
        });
      }
    }
  }

  private checkPort(port, host, callback) {
    var socket = new Socket(), status = null;

    // Socket connection established, port is open
    socket.on('connect', function() {status = 'open';socket.end();});
    socket.setTimeout(1500);// If no response, assume port is not listening
    socket.on('timeout', function() {status = 'closed';socket.destroy();});
    socket.on('error', function(exception) {status = 'closed';});
    socket.on('close', function(exception) {callback(null, status,host,port);});

    socket.connect(port, host);
  }
}
