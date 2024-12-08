import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ContactService, ContactFormData } from '../../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  loading = false;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]], // Added phone field
      countryCode: ['', [Validators.required]], // Added countryCode field
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendMessage(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.error = '';
      
      const formData: ContactFormData = this.contactForm.value;
      
      this.contactService.sendMessage(formData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.contactForm.reset({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            countryCode: '',
            message: ''
          });
        },
        error: (error: any) => {
          console.error(error); // Log the error
          this.error = error?.message || 'An error occurred while sending the message';
          this.loading = false;
        }
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control?.touched && control?.hasError(errorType);
  }
}
