import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props

  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <>
      <h1 className="latest-match-heading">Latest Matches</h1>

      <div className="latest-match-card">
        <div className="latest-match-first-section">
          <p className="competing-team">{competingTeam}</p>

          <p className="match-date">{date}</p>

          <p className="match-details">{venue}</p>

          <p className="match-details">{result}</p>
        </div>

        <div className="latest-match-second-section">
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="competing-team-logo"
          />
        </div>

        <div className="latest-match-third-section">
          <p className="innings-heading">First Innings</p>
          <p className="match-details">{firstInnings}</p>

          <p className="innings-heading">Second Innings</p>
          <p className="match-details">{secondInnings}</p>

          <p className="innings-heading">Man Of The Match</p>
          <p className="match-details">{manOfTheMatch}</p>

          <p className="innings-heading">Umpires</p>
          <p className="match-details">{umpires}</p>
        </div>
      </div>
    </>
  )
}

export default LatestMatch
