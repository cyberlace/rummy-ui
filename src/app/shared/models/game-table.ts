export class GameTable {
  id: number;
  userId: number;
  userFirstName: string;
  tableType: string;
  gameType: string;
  bet: number;
  maxPlayers: number;
  status: string;

  convertForAPI() {
    return {
      'id': +this.id,
      'user_id': +this.userId,
      'table_type': this.tableType,
      'game_type': this.gameType,
      'bet': +this.bet,
      'max_players': +this.maxPlayers,
      'status': this.status
    };
  }
}
