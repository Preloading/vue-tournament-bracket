interface Player {
  id: string;
  name: string;
  winner: boolean;
}

interface GameObject {
  player1: Player;
  player2: Player;
  matchResult?: string;
}

interface RoundsGameObject {
  games: GameObject[];
}

interface GameMatchObject {
  player1: Player;
  player2: Player;
  matchResult?: string;
  title: string;
  hasParent: boolean;
  games: GameMatchObject[];
}

interface GameObjectFlatTree {
  id: number;
  next?: number;
  player1: Player;
  player2: Player;
}

interface GameMatchObjectFlatTree {
  id: number;
  next?: number;
  player1: Player;
  player2: Player;
  title: string;
  hasParent: boolean;
  games: GameMatchObjectFlatTree[];
}

type RoundsGameObjectArray = RoundsGameObject[];
type RoundsGameObjectFlatArray = GameObjectFlatTree[];
type GameMatchObjectArray = GameMatchObject[];
type GameMatchObjectFlatTreeArray = GameMatchObjectFlatTree[];
