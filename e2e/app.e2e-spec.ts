import { AngularGraphqlPage } from './app.po';

describe('angular-graphql App', () => {
  let page: AngularGraphqlPage;

  beforeEach(() => {
    page = new AngularGraphqlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
