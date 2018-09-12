import { TeamCalendarModule } from './team-calendar.module';

describe('TeamCalendarModule', () => {
  let teamCalendarModule: TeamCalendarModule;

  beforeEach(() => {
    teamCalendarModule = new TeamCalendarModule();
  });

  it('should create an instance', () => {
    expect(teamCalendarModule).toBeTruthy();
  });
});
