describe('logogram', function() {
  beforeEach(() => {
    browser.get('index.html');
  });

  it('should fill the first cell', function() {
    const cell = element(by.tagName('cell'));
    expect(browser.getCurrentUrl()).toMatch("/index.html");
  });
});