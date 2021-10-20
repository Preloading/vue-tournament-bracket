function constructTree(
  tree: GameMatchObjectFlatTree,
  mapOfChildren: Record<number, RoundsGameObjectFlatArray>,
  processedRound: number
): GameMatchObjectFlatTree {
  const totalChildren = mapOfChildren[tree.id] || [];

  tree.title = `round ${processedRound}`;

  for (let i = 0; i < totalChildren.length; i++) {
    const childGame = totalChildren[i];

    const treeChild = {
      ...childGame,
      title: `round ${processedRound}`,
      hasParent: true,
      games: [],
    };

    constructTree(treeChild, mapOfChildren, processedRound - 1);

    tree.games.push(treeChild);
  }

  return tree;
}

export function transform(
  rounds: RoundsGameObjectArray | null
): GameMatchObject | null {
  if (!rounds) {
    return null;
  }

  const totalRounds = rounds.length;
  let currentRound: GameMatchObjectArray = [];
  let previousRound: GameMatchObjectArray = [];

  for (let i = 0; i < totalRounds; i++) {
    currentRound = rounds[i].games.map((game) => {
      return {
        ...game,
        title: `round ${i}`,
        games: [],
        hasParent: !!rounds[i + 1],
      };
    });

    if (previousRound.length === 0) {
      previousRound = currentRound;
      continue;
    }

    for (let j = 0; j < previousRound.length; j++) {
      const matchForCurrentGame = Math.floor(j / 2);
      currentRound[matchForCurrentGame].games.push(previousRound[j]);
    }

    previousRound = currentRound;
  }

  return currentRound[0] || null;
}

export function transformFlatTree(
  games: RoundsGameObjectFlatArray
): GameMatchObjectFlatTree {
  const mapOfGamesPerParent: Record<number, RoundsGameObjectFlatArray> = {};

  let root: GameObjectFlatTree | null = null;

  games.forEach((game) => {
    if (!game.next && !root) {
      root = game;
      return;
    }

    if (!mapOfGamesPerParent[game.next]) {
      mapOfGamesPerParent[game.next] = [];
    }

    mapOfGamesPerParent[game.next].push(game);
  });

  const tree: GameMatchObjectFlatTree = {
    ...(root || ({} as GameMatchObjectFlatTree)),
    title: 'round',
    games: [],
    hasParent: false,
  };

  return constructTree(
    tree,
    mapOfGamesPerParent,
    Object.keys(mapOfGamesPerParent).length
  );
}

export default {
  transform,
  transformFlatTree,
};
