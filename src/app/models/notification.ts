export class Notification {
  id: number;
  requester: string;
  approver: string;
  entityId: number;
  status: string;
  action: string;
  newValue: string;
  entityType: string;
  subject: string;
  body: string;
  createdOn: Date;
  fields: FieldEdit[];
}

export class FieldEdit {
  editId: number;
  field: string;
  newValue: string;
}
