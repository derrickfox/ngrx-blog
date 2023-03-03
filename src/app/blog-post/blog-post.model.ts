export interface BlogPost {
    id: string;
    title: string;
    date: Date;
    content: string;
    author: string;
    status: string;
}
  
// export class BlogPost {
//     constructor(
//       public id: string,
//       public title: string,
//       public date: Date,
//       public content: string,
//       public author: string,
//       public status: string
//     ) {}

//     // getters and setters
//     public getId(): string {
//         return this.id;
//         }
//     public setId(id: string): void {
//         this.id = id;
//         }
//     public getTitle(): string {
//         return this.title;
//         }
//     public setTitle(title: string): void {
//         this.title = title;
//         }
//     public getDate(): Date {
//         return this.date;
//         }
//     public setDate(date: Date): void {
//         this.date = date;
//         }
//     public getContent(): string {
//         return this.content;
//         }
//     public setContent(content: string): void {
//         this.content = content;
//         }
//     public getAuthor(): string {
//         return this.author;
//         }
//     public setAuthor(author: string): void {
//         this.author = author;
//         }
//     public getStatus(): string {
//         return this.status;
//         }
//     public setStatus(status: string): void {
//         this.status = status;
//         }
    
//   }
  