import { AuthorizationService } from './../authorization.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { OnInit, ViewChild, Component } from '@angular/core';
import { lessonListInterface } from '../interface/lessonListInterface';


@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  myLogin: string;
  lessons: any;
  isInstructor: boolean;
  allKursants$: any;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected Auth: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.Auth.getTypeOfUser(localStorage.getItem('userToken')).subscribe(data =>  {
      switch (data) {
        case 0:
          this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
            this.Auth.getLessons(localStorage.getItem('userToken'), dat.id).subscribe(da => {
              this.lessons = JSON.stringify(da);
              this.lessons = this.lessons.replace(/date/g,"start");
              this.lessons = this.lessons.replace(/endDate/g,"end");
              this.calendarOptions = {
                editable: false,
                eventLimit: false,
                handleWindowResize: true,
                locale:	'pl',
                buttonText: {
                  today: 'Dzisiaj',
                  month: 'Miesiąc',
                  week: 'Tydzień',
                  day: 'Dzień',
                  list: 'Plan tygodnia',
                },
                header: {
                  left: 'prev,next',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay,listWeek'
                },
                views: {
                  agendaWeek: {
                    columnFormat: 'ddd D - M',
                  }
                },
                slotLabelFormat:"HH:mm",
                timeFormat: 'H(:mm)',
                allDaySlot: false,
                noEventsMessage:"Brak wydarzeń do wyświetlenia",
                events: JSON.parse(this.lessons)
              };
            });
          });
        break;

        case 1:
        this.isInstructor = true;
        this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
          this.Auth.getLessons(localStorage.getItem('userToken'), dat.id).subscribe(da => {
            this.lessons = JSON.stringify(da);
            this.lessons = this.lessons.replace(/date/g,"start");
            this.lessons = this.lessons.replace(/endDate/g,"end");
            this.calendarOptions = {
              editable: false,
              eventLimit: false,
              handleWindowResize: true,
              locale:	'pl',
              buttonText: {
                today: 'Dzisiaj',
                month: 'Miesiąc',
                week: 'Tydzień',
                day: 'Dzień',
                list: 'Plan tygodnia',
              },
              header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
              },
              views: {
                agendaWeek: {
                  columnFormat: 'ddd D - M',
                }
              },
              slotLabelFormat:"HH:mm",
              timeFormat: 'H(:mm)',
              allDaySlot: false,
              noEventsMessage:"Brak wydarzeń do wyświetlenia",
              events: JSON.parse(this.lessons)
            };
          });
        });
        break;

        case 2:
          this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(dat => {
            this.Auth.getLessons(localStorage.getItem('userToken'), dat.id).subscribe(da => {
              this.lessons = JSON.stringify(da);
              this.lessons = this.lessons.replace(/date/g,"start");
              this.lessons = this.lessons.replace(/endDate/g,"end");
              this.calendarOptions = {
                editable: false,
                eventLimit: false,
                handleWindowResize: true,
                locale:	'pl',
                buttonText: {
                  today: 'Dzisiaj',
                  month: 'Miesiąc',
                  week: 'Tydzień',
                  day: 'Dzień',
                  list: 'Plan tygodnia',
                },
                header: {
                  left: 'prev,next',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay,listWeek'
                },
                views: {
                  agendaWeek: {
                    columnFormat: 'ddd D - M',
                  }
                },
                slotLabelFormat:"HH:mm",
                timeFormat: 'H(:mm)',
                allDaySlot: false,
                noEventsMessage:"Brak wydarzeń do wyświetlenia",
                events: JSON.parse(this.lessons)
              };
            });
          });
        break;
      }
    });

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  addLesson(email: any , date2: any, minut: any) {
    const minutes = 60;
    const minutesAsMiliseconds = minutes * 60000 * 2;
    const date = new Date(date2);
    const dateAsTimestamp = date.valueOf();
    const endDateAsTimestamp = dateAsTimestamp + minutesAsMiliseconds;
    const dateToSave = new Date(endDateAsTimestamp);

    console.log(date2);
    console.log(dateToSave);

    this.Auth.generalInfo(localStorage.getItem('userToken'), email).subscribe(data => {
      this.Auth.addLessons(localStorage.getItem('userToken'), data.id, dateToSave.toISOString().split('.')[0], date2).subscribe();
    });
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }
}
