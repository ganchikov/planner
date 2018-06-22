import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {TeamModule} from './team/team.module';
import { TeamGanttModule } from './team-gantt/team-gantt.module';
import {PrimeControlsModule} from './common/primecontrols.module';
import {AppCommonModule} from './common/app-common.module';
import {AppConfig} from '../app/app.config';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
describe('AppComponent', () => {
  beforeEach(async(() => {
    AppConfig.load().then(() => {
      // platformBrowserDynamic().bootstrapModule(AppModule)
      // .catch(err => console.log(err));
      TestBed.configureTestingModule({
        declarations: [
          AppComponent
        ],
        imports: [
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          PrimeControlsModule,
          AppCommonModule,
          TeamModule,
          TeamGanttModule,
          AppRoutingModule
        ],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }).compileComponents();
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Planner'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Planner');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
