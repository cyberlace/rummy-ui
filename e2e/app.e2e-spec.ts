import { RummyFrontendNgPage } from './app.po';

describe('rummy-frontend-ng App', () => {
  let page: RummyFrontendNgPage;

  beforeEach(() => {
    page = new RummyFrontendNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
