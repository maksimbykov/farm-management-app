import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css'],
})
export class AnimalManagementComponent implements OnInit {
  animals: Animal[] = [];
  newAnimal!: string;
  busy: boolean = false;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  constructor(
    private animalService: AnimalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAnimals();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addAnimal();
    }
  }

  scrollToBottom(): void {
    try {
      const liRef = this.myScrollContainer.nativeElement
        .children[0] as HTMLElement;
      this.myScrollContainer.nativeElement.scrollTo(
        0,
        this.myScrollContainer.nativeElement.scrollHeight + liRef.offsetHeight
      );
    } catch (error) {}
  }

  loadAnimals() {
    this.busy = true;
    this.animalService.getAnimals().subscribe({
      next: (animals) => {
        this.animals = animals.sort((a, b) => a.name.localeCompare(b.name)); //optional sort
        this.busy = false;
      },
      error: (error) => {
        this._snackBar.open(error, 'OK', { duration: 5000 });
        this.busy = false;
      },
    });
  }

  addAnimal() {
    if (!this.newAnimal) {
      return;
    }
    this.busy = true;
    this.animalService.addAnimal(this.newAnimal).subscribe({
      next: () => {
        this.loadAnimals();
        this.newAnimal = '';
        setTimeout(() => {
          this.scrollToBottom();
        }, 1000);
        this._snackBar.open('Added', 'OK', { duration: 3000 });
      },
      error: (error) => {
        this._snackBar.open(error, 'OK', { duration: 5000 });
        this.busy = false;
      },
    });
  }

  deleteAnimal(name: string) {
    this.busy = true;
    this.animalService.deleteAnimal(name).subscribe({
      next: () => {
        this.loadAnimals();
        this._snackBar.open('Deleted', 'OK', { duration: 3000 });
      },
      error: (error) => {
        this._snackBar.open(error, 'OK', { duration: 5000 });
        this.busy = false;
      },
    });
  }
}
