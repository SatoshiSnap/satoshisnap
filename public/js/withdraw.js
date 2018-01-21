console.log('\n'); // bitcore uses bitpay server



var privateKeyWIF = 'cW71rTqCqWoUcFcCuETwniDsiqf1Ecx1x3Qc6QnGPV5Z5mPcPka3';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
var address = privateKey.toAddress(); // our address
//console.log('address:');
//console.log(address);

//var value = new Buffer('this is a way to generate an address from a string--risky--not random--guessable!!!');
//var hash = bitcore.crypto.Hash.sha256(value);
//var bn = bitcore.crypto.BN.fromBuffer(hash);
var address2 =   // new bitcore.PrivateKey(bn,'testnet').toAddress(); //wallet address here
console.log('address2:');
console.log(address2);

var Insight = require('bitcore-explorers').Insight;
var insight = new Insight('testnet');

insight.getUnspentUtxos(address,function(err, utxos){
  if(err){
    //Handle errors
  }else {
    // use the UTXOs to create transaction
    console.log(utxos);
    var tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(address2,10000); // Withdraw ammount here
    tx.change(address); //change goes back to old address
    tx.fee(50000);
    tx.sign(privateKey);

    //console.log('transaction:');
    //console.log(tx.toObject());
    tx.serialize();

    //Scripting Print
    //var scriptIn = bitcore.Script(tx.toObject().inputs[0].script);
    //console.log('input script string: ');
    //console.log(scriptIn.toString());
    //var scriptOut = bitcore.Script(tx.toObject().outputs[0].script);
    //console.log('output script string: ')
    //console.log(scriptOut.toString());

    //tx.addData()
    insight.broadcast(tx, function(err,returnedTxId){ //sends the transaction
      if(err){
        //Handle errors
      }else{
        //Mark the transaction as broadcasted
        console.log('sucessful broadcast: ' + returnedTxId);
      }
    });
  }
});
