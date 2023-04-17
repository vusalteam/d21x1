const getSteamMatchesHistory = async (steamId: string) => {
  const response = await fetch(
    `http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?account_id=${steamId}&game_mode=16&key=${process.env.STEAM_API_KEY}`,
  );
  const data = await response.json();
  return data;
};
const getSteamMatchDetails= async (matchId: string) => {
  const response = await fetch(
    `http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=${process.env.STEAM_API_KEY}&match_id=${matchId}`,
  );
  const data = await response.json();
  return data;
};

export const searchUsersMatch = async (firstUserSteamId: string, secondUserSteamId: string) => {
  const firstUserMatches = await getSteamMatchesHistory(firstUserSteamId);
  const secondUserMatches = await getSteamMatchesHistory(secondUserSteamId);

};
export interface Result {
    status:            number;
    num_results:       number;
    total_results:     number;
    results_remaining: number;
    matches:           Match[];
}

export interface Match {
    match_id:        number;
    match_seq_num:   number;
    start_time:      number;
    lobby_type:      number;
    radiant_team_id: number;
    dire_team_id:    number;
    players:         Player[];
}

export interface Player {
    account_id:  number;
    player_slot: number;
    team_number: number;
    team_slot:   number;
    hero_id:     number;
}