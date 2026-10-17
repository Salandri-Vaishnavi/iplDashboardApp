import './index.css'

const MatchCard = props => {
  const {matchDetails} = props

  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-team-logo"
      />

      <p className="competing-team-name">{competingTeam}</p>

      <p className="match-result">{result}</p>

      <p className="match-status">{matchStatus}</p>
    </li>
  )
}

export default MatchCard
