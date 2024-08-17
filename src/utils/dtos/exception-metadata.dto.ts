export class ExceptionMetadataDTO {
  message: string;
  field: string;

  constructor(message?: string, field?: string) {
    if (message) this.message = message;
    if (field) this.field = field;
  }
}
