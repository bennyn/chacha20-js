describe('Zip code validation', () => {
  xit('recognizes a valid zip code', function () {
    var validator = new Validation.ZipCodeValidator();
    var actual = validator.isAcceptable('13088');
    expect(actual).toBe(true);
  });
});
