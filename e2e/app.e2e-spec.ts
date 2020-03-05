import { EmployeeManagementPage } from './app.po';

describe('employee-management App', function() {
  let page: EmployeeManagementPage;

  beforeEach(() => {
    page = new EmployeeManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
