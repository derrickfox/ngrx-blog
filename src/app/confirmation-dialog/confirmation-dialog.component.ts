

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openConfirmationDialog(): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this item?' }
    });
  }

  onDelete(): void {
    const dialogRef = this.openConfirmationDialog();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the delete action or any other action you want to do when the user confirms.
        console.log('User confirmed deletion');
      } else {
        console.log('User canceled deletion');
      }
    });
  }

}
