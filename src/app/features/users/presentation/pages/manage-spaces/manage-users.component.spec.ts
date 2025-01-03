import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSpacesComponent } from '../../../../spaces/presentation/pages/manage-spaces/manage-spaces.component';
import { ManageusersComponent } from './manage-users.component';


describe('ManageUsersComponent', () => {
  let component: ManageusersComponent;
  let fixture: ComponentFixture<ManageusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageusersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
