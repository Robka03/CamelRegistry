import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camel, CamelService } from '../../services/camel';

@Component({
  selector: 'app-camel-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './camel-manager.html',
  styleUrl: './camel-manager.css'
})
export class CamelManagerComponent implements OnInit {
  camels: Camel[] = [];
  camelForm: FormGroup;
  isEditMode = false;
  editingId?: number;
  errorMessage: string = '';

  constructor(private camelService: CamelService, private fb: FormBuilder) {
    this.camelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      humpCount: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
      color: [''],
      lastFed: [new Date().toISOString().substring(0, 16)]  
    });
  }

  ngOnInit(): void {
    this.loadCamels();
  }

  loadCamels(): void {
    this.camelService.getCamels().subscribe({
      next: (data) => this.camels = data,
      error: (err) => this.errorMessage = 'Hiba a tevék betöltésekor!'
    });
  }

  onSubmit(): void {
    if (this.camelForm.invalid) return;

    const camelData = this.camelForm.value;

    if (this.isEditMode && this.editingId) {
      this.camelService.updateCamel(this.editingId, camelData).subscribe(() => {
        this.resetForm();
        this.loadCamels();
      });
    } else {
      this.camelService.createCamel(camelData).subscribe(() => {
        this.resetForm();
        this.loadCamels();
      });
    }
  }

  editCamel(camel: Camel): void {
    this.isEditMode = true;
    this.editingId = camel.id;
    this.camelForm.patchValue(camel);
  }

  deleteCamel(id: number): void {
    if (confirm('Biztosan törlöd ezt a tevét?')) {
      this.camelService.deleteCamel(id).subscribe(() => this.loadCamels());
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.editingId = undefined;
    this.camelForm.reset({ humpCount: 1, lastFed: new Date().toISOString().substring(0, 16) });
  }
}