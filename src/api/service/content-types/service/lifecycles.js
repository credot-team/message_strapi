const char = '0123456789abcdefghijklmnopqrstuvwxyz'

function getRandom(x){
    return Math.floor(Math.random()*x);
};

function getSecret(){
    let temp = ''
    for (let i = 0; i < 30; i++) {
        temp+=char[getRandom(36)]
        
    }
    return temp
}

module.exports = {
    beforeCreate(event) {
      if (!event.params.data.secret) {
        event.params.data.secret=getSecret()
      }
    },
  };

  

