import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceMock } from '@app/core/services';
import { AuthService } from '@app/core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '@app/app-routing.module';
import {TeamModule} from '@app/team/team.module';
import { TeamGanttModule } from '@app/team-gantt/team-gantt.module';
import {PrimeControlsModule} from '@app/core/primecontrols.module';
import {CoreModule} from '@app/core/core.module';
import {AppConfig} from '@app/app.config';

import { AppComponent } from '@app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
          RouterTestingModule,
          HttpClientTestingModule
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {provide: APP_BASE_HREF, useValue: '/'},
          {provide: AuthService, useClass: AuthServiceMock}
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
