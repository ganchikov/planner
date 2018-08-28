import { TeamScheduleModule } from '@app/team-schedule/team-schedule.module';

describe('TeamScheduleModule', () => {
  let teamScheduleModule: TeamScheduleModule;

  beforeEach(() => {
    teamScheduleModule = new TeamScheduleModule();
  });

  it('should create an instance', () => {
    expect(teamScheduleModule).toBeTruthy();
  });
});
