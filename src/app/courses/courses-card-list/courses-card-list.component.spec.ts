import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { setupCourses } from "../common/setup-test-data";
import { DebugElement } from "@angular/core";
import { sortBy } from "cypress/types/lodash";
import { By } from "@angular/platform-browser";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  it("should create a component", () => {
    expect(component).toBeTruthy();
    console.log(component);
  });

  it("should display the courses list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("could not find cards");
    expect(cards.length).toBe(12, "unexpected no of courses");
  });

  it("should display the fist course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const course = component.courses[0];
    const card = el.query(By.css(".course-card:first-child")),
      title = card.query(By.css("mat-card-title")),
      img = card.query(By.css("img"));

    expect(card).toBeTruthy("could not find fist course cards");
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(img.nativeElement.src).toBe(course.iconUrl);
  });
});
