import { Contact } from '../contact/contact';

export class Activity{
   public id: number;
   public contact: Contact;
   public notes: string;
   public dueDate: Date;
}