export class Pagination {
  public limit: number = 100;
  public page: number = 1;

  constructor(page: number) {
    Object.assign(this, { page });
  }

  public get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
