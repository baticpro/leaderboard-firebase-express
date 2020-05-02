import Encrypter from '../Encrypter';

describe('testings encrypter', () => {
  const encrypter = new Encrypter();

  it('should encrypt | decrypt same', function () {
    const data = { hello: 'me' };
    const encrypted = encrypter.encrypt(data);
    const decrypted = encrypter.decrypt(encrypted);

    expect(decrypted).toEqual(data);
  });
});
