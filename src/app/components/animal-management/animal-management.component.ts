import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css']
})
export class AnimalManagementComponent implements OnInit {
  animals: Animal[] = [];
  newAnimal!: string;

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });
  }

  addAnimal() {
    this.animalService.addAnimal(this.newAnimal).subscribe(() => {
      this.loadAnimals();
      this.newAnimal = '';
    });
  }

  deleteAnimal(name: string) {
    this.animalService.deleteAnimal(name).subscribe(() => {
      this.loadAnimals();
    });
  }

}
