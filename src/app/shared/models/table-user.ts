export class TableUser {
  id: number;
  userId: number;
  gameTableId: number;
  position: number;
  status: string;
  userFirstName: string;

  convertForAPI() {
    return {
      'id': +this.id,
      'user_id': +this.userId,
      'game_table_id': +this.gameTableId,
      'position': this.position,
      'status': this.status,
      'user_first_name': this.userFirstName
    };
  }
}
