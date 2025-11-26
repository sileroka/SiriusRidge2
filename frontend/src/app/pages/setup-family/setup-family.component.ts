import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-setup-family',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Button,
    Card
  ],
  templateUrl: './setup-family.component.html'
})
export class SetupFamilyComponent {
  createFamilyForm: FormGroup;
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createFamilyForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onCreateFamily(): void {
    if (this.createFamilyForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.createFamily(this.createFamilyForm.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/calendar']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to create family. Please try again.');
      }
    });
  }
}
