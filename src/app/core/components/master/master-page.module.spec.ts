import { MasterPageModule } from './master-page.module';

describe('MasterModule', () => {
  let masterModule: MasterPageModule;

  beforeEach(() => {
    masterModule = new MasterPageModule();
  });

  it('should create an instance', () => {
    expect(masterModule).toBeTruthy();
  });
});
