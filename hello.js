(async() => {
  const response = await fetch('hello.wasm');
  const file = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(file);
  const {memory, caesarEncrypt, caesarDecrypt } = wasm.instance.exports;
  const plaintext = "helloworld";
  const myKey = 3;
  const encode = function stringToIntegerArray(string,array){
    const alphabet ="abcdefghijklmnopqrstuvwxyz";
    for(let i=0; i< string.length; i++){
      array[i]= alphabet.indexOf(string[i]);
    }
  }
  const decode = function integerArrayToString(array){
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let string = "";
    for(let i=0; i< array.length; i++){
      string += alphabet[array[i]];
    }
    return string;
  }
  const myArray = new Int32Array(memory.buffer, 0, plaintext.length);
  encode(plaintext, myArray);

  caesarEncrypt(myArray.byteOffset, plaintext.length, myKey);
  console.log(myArray);
  console.log(decode(myArray));
  caesarDecrypt(myArray.byteOffset, plaintext.length, myKey);
  console.log(myArray);
  console.log(decode(myArray));

})();
