export class EditWorkshopDTO {
  workshopId: number;
  name: string;
  description: string;

  constructor(workshopId: number, name: string, description: string) {
    this.workshopId = workshopId;
    this.name = name;
    this.description = description;
  }
}
