/* global expect */

// https://tools.ietf.org/html/draft-agl-tls-chacha20poly1305-00#section-7
describe('ChaCha20Poly1305 Test Vectors', function() {
  it('is compliant with IETF test vectors', function() {
    var vectors = {
      "A": {
        key: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0000000000000000',
        prefix: '76b8e0ada0f13d90405d6ae55386bd28bdd219b8a08ded1aa836efcc8b770dc7da41597c5157488d7724e03fb8d84a376a43b8f41518a11cc387b669'
      },
      "B": {
        key: '0000000000000000000000000000000000000000000000000000000000000001',
        nonce: '0000000000000000',
        prefix: '4540f05a9f1fb296d7736e7b208e3c96eb4fe1834688d2604f450952ed432d41bbe2a0b6ea7566d2a5d1e7e20d42af2c53d792b1c43fea817e9ad275'
      },
      "C": {
        key: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0000000000000001',
        prefix: 'de9cba7bf3d69ef5e786dc63973f653a0b49e015adbff7134fcb7df137821031e85a050278a7084527214f73efc7fa5b5277062eb7a0433e445f41e3'

      },
      "D": {
        key: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0100000000000000',
        prefix: 'ef3fdfd6c61578fbf5cf35bd3dd33b8009631634d21e42ac33960bd138e50d32111e4caf237ee53ca8ad6426194a88545ddc497a0b466e7d6bbdb004'
      }
    };

    var firstVector = new de.bennyn.crypto.ChaCha20.Vector(vectors.A);
    var secondVector = new de.bennyn.crypto.ChaCha20.Vector(vectors.B);
    var thirdVector = new de.bennyn.crypto.ChaCha20.Vector(vectors.C);
    var fourthVector = new de.bennyn.crypto.ChaCha20.Vector(vectors.D);

    var context = new de.bennyn.crypto.ChaCha20.Context(firstVector);
    context.generateKeyStream();
    expect(context.getKeyStreamAsHex()).toContain(vectors.A.prefix);

    context = new de.bennyn.crypto.ChaCha20.Context(secondVector);
    context.generateKeyStream();
    expect(context.getKeyStreamAsHex()).toContain(vectors.B.prefix);

    context = new de.bennyn.crypto.ChaCha20.Context(thirdVector);
    context.generateKeyStream();
    expect(context.getKeyStreamAsHex()).toContain(vectors.C.prefix);

    context = new de.bennyn.crypto.ChaCha20.Context(fourthVector);
    context.generateKeyStream();
    expect(context.getKeyStreamAsHex()).toContain(vectors.D.prefix);
  });
});

describe('Encryption', function() {
  xit('can encrypt a text message', function() {
    var key = new ArrayBuffer(32);
    var keyBufferView = new Uint8Array(key);
    for (var i = 0; i < keyBufferView.length; i++) {
      keyBufferView[i] = 0;
    }

    var nonce = new ArrayBuffer(8);
    var nonceBufferView = new Uint8Array(nonce);
    for (var i = 0; i < nonceBufferView.length; i++) {
      nonceBufferView[i] = 0;
    }

    var source = de.bennyn.crypto.ChaCha20.Converter.stringToUint8Array("testing");
    var input = new Uint32Array(16);
    var length = source.length;
    var destination = new Uint8Array(8);

    var context = new de.bennyn.crypto.ChaCha20.Context(key, nonce);
    context.encrypt(destination, source, input, length);

    var cipherText = de.bennyn.crypto.ChaCha20.Converter.byteArrayToHex(destination);
    expect(cipherText).toContain("02dd93d9c99f5a");
  });
});
