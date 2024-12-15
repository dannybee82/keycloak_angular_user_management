import { Component, Inject } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {} 

  onCancel() : void {
    this.data.confirmDelete = false;
    this.dialogRef.close(this.data);
  }

  onDelete() : void {
    this.data.confirmDelete = true;
    this.dialogRef.close(this.data);
  }

}
