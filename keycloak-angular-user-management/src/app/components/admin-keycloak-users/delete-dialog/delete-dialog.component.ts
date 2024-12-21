import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,   
    MatButtonModule 
  ]
})
export class DeleteDialogComponent {

  public dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  onCancel() : void {
    this.data.confirmDelete = false;
    this.dialogRef.close(this.data);
  }

  onDelete() : void {
    this.data.confirmDelete = true;
    this.dialogRef.close(this.data);
  }

}