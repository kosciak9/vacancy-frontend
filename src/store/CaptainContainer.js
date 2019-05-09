import axios from "axios";
import { Container } from "unstated";
import { keyBy } from "lodash";

class CaptainContainer extends Container {
  name = "CaptainContainer";
  state = {
    players: {},
    availability: {}
  };

  getTeamAvailability = async () => {
    const response = await axios.get("/v1/priority/team/");
    const update = {};
    for (let i = 0; i < response.data.length; i++) {
      const date = response.data[i].date;
      const availability = response.data[i].availability;
      update[date] = availability;
    }
    this.setState({ availability: update });
  };

  getPlayers = async () => {
    const userDetails = await axios.get("/auth/me/");
    const playerDetails = await axios.get(`/v1/users/${userDetails.data.id}/`);
    const playerList = await axios.get(
      `/v1/users/?username=&team=${playerDetails.data.team}`
    );
    const update = keyBy(playerList.data, element => element.id);
    this.setState({ players: update });
  };

  getPlayerName = id => {
    const player = this.state.players[id];
    return player
      ? `${player.kit_number}. ${player.first_name} ${player.last_name}`
      : id;
  };
}
export default CaptainContainer;
