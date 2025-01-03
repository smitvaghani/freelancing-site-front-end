import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username!: string;
  public description: string | null = null;
  public registerUserDate!: string;
  public Cateogry!: string;
  public showDesc: boolean = false;
  public userId!: string;
  public showEdu: boolean = false;
  public userCollegeCountry: string | null = null;
  public userDegree: string | null = null;
  public userBranch: string | null = null;
  public userCollege: string | null = null;
  public userYearOfGraduation: number | null = null;
  public showCerti: boolean = false;
  public userCertificate: string | null = null;
  public userCertificateFrom: string | null = null;
  public userCertificateYear: number | null = null;
  public imageUrl: string | null = null;
  public category!: string;
  public showCat: boolean = false;
  public userRole!: string;
  certificateForm!: UntypedFormGroup;
  descriptionForm!: UntypedFormGroup;
  educationForm!: UntypedFormGroup;
  profileForm!: UntypedFormGroup;
  categoryForm!: UntypedFormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  constructor(private title: Title, private router: Router, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.loggedUser().subscribe(
      (res: any) => {
        if (res.status == 'ok') {
          let temp = res.data.Email.split('@', 2);
          this.username = temp[0];
          var userDate = Date.parse(res.data.createdAt);
          var date = new Date(userDate);
          this.registerUserDate = date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear();
          this.userId = res.data._id;
          this.userCollegeCountry = res.data.CollegeCountry;
          this.description = res.data.Description;
          this.userYearOfGraduation = res.data.YearOfGraduation;
          this.userCollege = res.data.CollegeName;
          this.userBranch = res.data.Branch;
          this.userDegree = res.data.Degree;
          this.userCertificate = res.data.Certificate;
          this.userCertificateFrom = res.data.CertificateFrom;
          this.userCertificateYear = res.data.YearOfCertificate;
          this.imageUrl = "../../../assets/uploads/" + res.data.profileImg;
          this.category = res.data.Category;
          this.userRole = res.data.Role;
          this.title.setTitle("Update your Profile - " + res.data.Email);
        }
      }
    )
    this.descriptionForm = new UntypedFormGroup(
      { descriptionControl: new UntypedFormControl("") }
    );
    this.educationForm = new UntypedFormGroup({
      collegeCountryControl: new UntypedFormControl(""),
      collegeControl: new UntypedFormControl(""),
      degreeControl: new UntypedFormControl(""),
      branchControl: new UntypedFormControl(""),
      yearControl: new UntypedFormControl("")
    });
    this.certificateForm = new UntypedFormGroup({
      certificateControl: new UntypedFormControl(""),
      certificateFromControl: new UntypedFormControl(""),
      certificateYearControl: new UntypedFormControl("")
    })
    this.profileForm = new UntypedFormGroup({
      uploadFile: new UntypedFormControl("")
    })
    this.categoryForm = new UntypedFormGroup({
      categoryControl: new UntypedFormControl("")
    })
  }
  showCategory() {
    this.showCat = true;
  }
  cancelCat() {
    this.showCat = false;
  }
  get cat() {
    return this.categoryForm.get('categoryControl');
  }
  submitCat() {
    this.showCat = false;
    var obj = {
      id: this.userId,
      category: this.cat?.value
    }
    this.category = this.cat?.value;
    this.authService.addCategory(obj).subscribe();
  }
  get descr() {
    return this.descriptionForm.get('descriptionControl');
  }
  get edu() {
    return this.educationForm.controls;
  }
  get certi() {
    return this.certificateForm.controls;
  }
  get profileImg() {
    return this.profileForm.controls;
  }
  showDescriptionBox() {
    this.showDesc = true;
  }
  cancelDesc() {
    this.showDesc = false;
  }
  submitDescription() {
    this.description = this.descr?.value;
    this.showDesc = false;
    var obj = {
      id: this.userId,
      description: this.descr?.value
    }
    this.authService.addDescription(obj).subscribe();
  }
  showEduBox() {
    this.showEdu = true;
  }
  cancelEdu() {
    this.showEdu = false;
  }
  submitEducation() {
    this.userCollegeCountry = this.edu.collegeCountryControl.value;
    this.userYearOfGraduation = this.edu.yearControl.value;
    this.userCollege = this.edu.collegeControl.value;
    this.userBranch = this.edu.branchControl.value;
    this.userDegree = this.edu.degreeControl.value;
    this.showEdu = false;
    var obj = {
      id: this.userId,
      collegeCountry: this.edu.collegeCountryControl.value,
      collegeName: this.edu.collegeControl.value,
      degree: this.edu.degreeControl.value,
      branch: this.edu.branchControl.value,
      yearOfGraduation: this.edu.yearControl.value
    }
    this.authService.addEducation(obj).subscribe();
  }
  showCertificateBox() {
    this.showCerti = true;
  }
  cancelCerti() {
    this.showCerti = false;
  }
  submitCertificate() {
    this.showCerti = false;
    this.userCertificate = this.certi.certificateControl.value;
    this.userCertificateFrom = this.certi.certificateFromControl.value;
    this.userCertificateYear = this.certi.certificateYearControl.value;
    var obj = {
      id: this.userId,
      certificate: this.certi.certificateControl.value,
      certificateFrom: this.certi.certificateFromControl.value,
      yearOfCertificate: this.certi.certificateYearControl.value
    }
    this.authService.addCertificate(obj).subscribe();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      let uniqueFileName = uuidv4() + "_" + file.name;
      const formData = new FormData();
      formData.append("file", file, uniqueFileName);
      const upload$ = this.http.post(`${environment.apiUrl}/api/file-upload`, formData);

      upload$.subscribe((res: any) => {
        if (res.status == 'ok') {
          this.imageUrl = "../../../assets/uploads/" + uniqueFileName;
          let obj = {
            id: this.userId,
            fileName: uniqueFileName
          };
          this.authService.addProfileImg(obj).subscribe();
        }
      },)
    }

  }
  //   countStar(star:number) {
  //     this.selectedValue=star;
  //     console.log('Value of star', star);
  //   }
  //   addClass(star:number) {
  //     let ab = "";
  //     for (let i = 0; i < star; i++) {
  //       ab = "starId" + i;
  //       document?.getElementById(ab)?.classList.add("selected");
  //     }
  //  }
  //  removeClass(star:number) {
  //     let ab = "";
  //    for (let i = star-1; i >= this.selectedValue; i--) {
  //       ab = "starId" + i;
  //       document?.getElementById(ab)?.classList.remove("selected");
  //     }
  //  }
}
